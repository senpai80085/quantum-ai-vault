import base64
import os
from typing import Tuple

from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes

from .config import settings


try:
    if settings.enable_pyoqs:
        import oqs  # type: ignore
    else:
        oqs = None
except Exception:
    oqs = None


KYBER_ALG = "Kyber512"


def _ensure_keys_dir() -> str:
    os.makedirs(settings.keys_dir, exist_ok=True)
    return settings.keys_dir


def _key_paths() -> Tuple[str, str]:
    keys_dir = _ensure_keys_dir()
    sk_path = os.path.join(keys_dir, "kem_sk.bin")
    pk_path = os.path.join(keys_dir, "kem_pk.b64")
    return sk_path, pk_path


def generate_kem_keypair() -> str:
    sk_path, pk_path = _key_paths()
    if oqs is not None:
        with oqs.KeyEncapsulation(KYBER_ALG) as kem:
            public_key = kem.generate_keypair()
            secret_key = kem.export_secret_key()
        with open(sk_path, "wb") as f:
            f.write(secret_key)
        with open(pk_path, "wb") as f:
            f.write(base64.b64encode(public_key))
        return base64.b64encode(public_key).decode()
    # FALLBACK: Not quantum secure — demo only
    pseudo_pk = os.urandom(32)
    with open(sk_path, "wb") as f:
        f.write(pseudo_pk)
    with open(pk_path, "wb") as f:
        f.write(base64.b64encode(pseudo_pk))
    return base64.b64encode(pseudo_pk).decode()


def get_or_create_public_key_b64() -> str:
    sk_path, pk_path = _key_paths()
    if os.path.exists(pk_path) and os.path.exists(sk_path):
        with open(pk_path, "rb") as f:
            return f.read().decode()
    return generate_kem_keypair()


def kem_encapsulate(pk_b64: str) -> Tuple[str, bytes]:
    pk = base64.b64decode(pk_b64)
    if oqs is not None:
        # Use public_key in encap_secret per pyOQS API
        with oqs.KeyEncapsulation(KYBER_ALG) as kem:
            ciphertext, shared_secret = kem.encap_secret(public_key=pk)
        return base64.b64encode(ciphertext).decode(), shared_secret
    # FALLBACK: Not quantum secure — demo only
    kem_ct = os.urandom(32)
    shared_secret = HKDF(
        algorithm=hashes.SHA256(), length=32, salt=None, info=b"fallback-kem"
    ).derive(pk + kem_ct)
    return base64.b64encode(kem_ct).decode(), shared_secret


def kem_decapsulate(kem_ct_b64: str) -> bytes:
    sk_path, _ = _key_paths()
    with open(sk_path, "rb") as f:
        sk = f.read()
    kem_ct = base64.b64decode(kem_ct_b64)
    if oqs is not None:
        # Load secret key and decapsulate
        with oqs.KeyEncapsulation(KYBER_ALG) as kem:
            kem.import_secret_key(sk)
            shared_secret = kem.decap_secret(ciphertext=kem_ct)
        return shared_secret
    # FALLBACK: Not quantum secure — demo only
    shared_secret = HKDF(
        algorithm=hashes.SHA256(), length=32, salt=None, info=b"fallback-kem"
    ).derive(sk + kem_ct)
    return shared_secret


def derive_aes_key(shared_secret: bytes) -> bytes:
    hkdf = HKDF(algorithm=hashes.SHA256(), length=32, salt=None, info=b"aes-256-gcm")
    return hkdf.derive(shared_secret)


def aes_encrypt(plaintext: bytes, aes_key: bytes) -> Tuple[str, str, str]:
    nonce = os.urandom(12)
    aesgcm = AESGCM(aes_key)
    ct = aesgcm.encrypt(nonce, plaintext, None)
    # cryptography returns ciphertext+tag concatenated
    ciphertext, tag = ct[:-16], ct[-16:]
    return base64.b64encode(ciphertext).decode(), base64.b64encode(nonce).decode(), base64.b64encode(tag).decode()


def aes_decrypt(ciphertext_b64: str, nonce_b64: str, tag_b64: str, aes_key: bytes) -> bytes:
    ciphertext = base64.b64decode(ciphertext_b64)
    nonce = base64.b64decode(nonce_b64)
    tag = base64.b64decode(tag_b64)
    aesgcm = AESGCM(aes_key)
    return aesgcm.decrypt(nonce, ciphertext + tag, None)


