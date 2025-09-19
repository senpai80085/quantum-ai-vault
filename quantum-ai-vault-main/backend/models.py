from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime, LargeBinary, Text
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from .config import settings


engine = create_engine(settings.database_url, connect_args={"check_same_thread": False} if settings.database_url.startswith("sqlite") else {})
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


class VaultEntry(Base):
    __tablename__ = "vault_entries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    kem_ct_b64 = Column(Text, nullable=False)
    aes_nonce_b64 = Column(String(255), nullable=False)
    aes_tag_b64 = Column(String(255), nullable=False)
    ciphertext_b64 = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


def init_db():
    Base.metadata.create_all(bind=engine)


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


