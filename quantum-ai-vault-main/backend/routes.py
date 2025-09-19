from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas
from .models import get_db, init_db, VaultEntry
from .crypto_utils import (
    get_or_create_public_key_b64,
    kem_encapsulate,
    kem_decapsulate,
    derive_aes_key,
    aes_encrypt,
    aes_decrypt,
)
from .generator import (
    generate_passphrase_ai,
    generate_random_string,
    generate_dev_key,
    entropy_bits_from_password,
    estimate_crack_time_bits,
)


router = APIRouter()


@router.on_event("startup")
def on_startup():
    init_db()
    get_or_create_public_key_b64()


@router.post("/generate", response_model=schemas.GenerateResponse)
def generate_password(req: schemas.GenerateRequest):
    if req.mode == "passphrase":
        pw = generate_passphrase_ai(words=req.words or 4)
    elif req.mode == "random":
        pw = generate_random_string(length=req.length or 16, use_symbols=bool(req.use_symbols))
    elif req.mode == "devkey":
        pw = generate_dev_key(length=req.length or 64)
    else:
        raise HTTPException(status_code=400, detail="invalid mode")

    entropy = entropy_bits_from_password(pw)
    classical, quantum = estimate_crack_time_bits(entropy)
    return schemas.GenerateResponse(password=pw, entropy_bits=entropy, classical_sec=classical, quantum_sec=quantum)


@router.get("/pk", response_model=schemas.PublicKeyResponse)
def get_public_key():
    pk_b64 = get_or_create_public_key_b64()
    return schemas.PublicKeyResponse(pk_b64=pk_b64)


@router.post("/encrypt", response_model=schemas.EncryptResponse)
def encrypt_item(req: schemas.EncryptRequest, db: Session = Depends(get_db)):
    pk_b64 = get_or_create_public_key_b64()
    kem_ct_b64, shared_secret = kem_encapsulate(pk_b64)
    aes_key = derive_aes_key(shared_secret)
    ct_b64, nonce_b64, tag_b64 = aes_encrypt(req.plaintext.encode("utf-8"), aes_key)
    entry = VaultEntry(
        title=req.title,
        kem_ct_b64=kem_ct_b64,
        aes_nonce_b64=nonce_b64,
        aes_tag_b64=tag_b64,
        ciphertext_b64=ct_b64,
        created_at=datetime.utcnow(),
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return schemas.EncryptResponse(id=entry.id)


@router.get("/items", response_model=list[schemas.VaultItem])
def list_items(db: Session = Depends(get_db)):
    rows = db.query(VaultEntry).order_by(VaultEntry.created_at.desc()).all()
    return [
        schemas.VaultItem(
            id=row.id,
            title=row.title,
            created_at=row.created_at,
            has_cipher=True,
        )
        for row in rows
    ]


@router.post("/decrypt", response_model=schemas.DecryptResponse)
def decrypt_item(req: schemas.DecryptRequest, db: Session = Depends(get_db)):
    row = db.query(VaultEntry).filter(VaultEntry.id == req.id).first()
    if not row:
        raise HTTPException(status_code=404, detail="item not found")
    try:
        shared_secret = kem_decapsulate(row.kem_ct_b64)
        aes_key = derive_aes_key(shared_secret)
        pt = aes_decrypt(row.ciphertext_b64, row.aes_nonce_b64, row.aes_tag_b64, aes_key)
        return schemas.DecryptResponse(plaintext=pt.decode("utf-8"))
    except Exception as e:
        raise HTTPException(status_code=500, detail="decryption failed") from e


