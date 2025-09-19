import math
import secrets
from functools import lru_cache
from typing import Optional

from .config import settings


@lru_cache(maxsize=1)
def _get_hf_pipeline():
    if settings.hf_disable:
        return None
    try:
        from transformers import pipeline  # type: ignore

        return pipeline("text-generation", model="gpt2")
    except Exception:
        return None


def generate_passphrase_ai(words: int = 4) -> str:
    gen = _get_hf_pipeline()
    if gen is None:
        return generate_passphrase_fallback(words)
    prompt = f"Generate a secure yet short passphrase of {words} words separated by dashes. Use only lowercase letters."
    out = gen(prompt, max_new_tokens=24, num_return_sequences=1, do_sample=True, temperature=0.8)
    text: str = out[0]["generated_text"]
    # Extract words-likeliness; fallback if empty
    import re

    tokens = re.findall(r"[a-zA-Z]+", text.lower())
    if len(tokens) < words:
        return generate_passphrase_fallback(words)
    return "-".join(tokens[:words])


def generate_passphrase_fallback(words: int = 4) -> str:
    wordlist = [
        "quantum",
        "neural",
        "matrix",
        "cipher",
        "secure",
        "vault",
        "shield",
        "guardian",
        "vector",
        "entropy",
        "photon",
        "kernel",
        "cosmic",
        "zenith",
        "oracle",
        "delta",
        "sigma",
        "lambda",
        "tau",
        "cipher",
        "nova",
        "plasma",
    ]
    return "-".join(secrets.choice(wordlist) for _ in range(max(2, words)))


def generate_random_string(length: int = 16, use_symbols: bool = True) -> str:
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    pool = alphabet + (symbols if use_symbols else "")
    return "".join(secrets.choice(pool) for _ in range(max(8, length)))


def generate_dev_key(length: int = 64) -> str:
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return "".join(secrets.choice(alphabet) for _ in range(max(32, length)))


def entropy_bits_from_password(pw: str) -> float:
    charset = 0
    if any("a" <= c <= "z" for c in pw):
        charset += 26
    if any("A" <= c <= "Z" for c in pw):
        charset += 26
    if any(c.isdigit() for c in pw):
        charset += 10
    if any(c for c in pw if not c.isalnum()):
        charset += 32
    if charset == 0 or len(pw) == 0:
        return 0.0
    return math.log2(charset ** len(pw))


def estimate_crack_time_bits(entropy_bits: float) -> tuple[float, float]:
    # classical: assume 1e10 guesses/sec
    # quantum: quadratic speedup ~ sqrt(N) -> effectively half the bits
    classical_guesses_per_sec = 1e10
    classical_sec = 2 ** entropy_bits / classical_guesses_per_sec
    quantum_effective_bits = max(0.0, entropy_bits / 2.0)
    quantum_sec = 2 ** quantum_effective_bits / classical_guesses_per_sec
    return classical_sec, quantum_sec


