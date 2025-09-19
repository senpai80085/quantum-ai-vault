from datetime import datetime
from pydantic import BaseModel, Field


class GenerateRequest(BaseModel):
    mode: str
    length: int | None = None
    words: int | None = None
    use_symbols: bool | None = None


class GenerateResponse(BaseModel):
    password: str
    entropy_bits: float
    classical_sec: float
    quantum_sec: float


class EncryptRequest(BaseModel):
    title: str
    plaintext: str


class EncryptResponse(BaseModel):
    id: int


class VaultItem(BaseModel):
    id: int
    title: str
    created_at: datetime
    has_cipher: bool = Field(default=True)


class DecryptRequest(BaseModel):
    id: int


class DecryptResponse(BaseModel):
    plaintext: str


class PublicKeyResponse(BaseModel):
    pk_b64: str


