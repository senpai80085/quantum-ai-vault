from backend.crypto_utils import (
    get_or_create_public_key_b64,
    kem_encapsulate,
    kem_decapsulate,
    derive_aes_key,
    aes_encrypt,
    aes_decrypt,
)


def test_kem_aes_roundtrip():
    pk_b64 = get_or_create_public_key_b64()
    kem_ct_b64, shared_secret_sender = kem_encapsulate(pk_b64)
    shared_secret_receiver = kem_decapsulate(kem_ct_b64)
    assert shared_secret_sender[:16] == shared_secret_receiver[:16]

    key_sender = derive_aes_key(shared_secret_sender)
    key_receiver = derive_aes_key(shared_secret_receiver)
    pt = b"hello quantum world"
    ct_b64, nonce_b64, tag_b64 = aes_encrypt(pt, key_sender)
    out = aes_decrypt(ct_b64, nonce_b64, tag_b64, key_receiver)
    assert out == pt


