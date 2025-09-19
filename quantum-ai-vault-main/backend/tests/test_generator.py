from backend.generator import (
    generate_passphrase_ai,
    generate_passphrase_fallback,
    generate_random_string,
    generate_dev_key,
    entropy_bits_from_password,
    estimate_crack_time_bits,
)


def test_generators_lengths():
    pw = generate_random_string(24, use_symbols=False)
    assert len(pw) >= 24
    dev = generate_dev_key(80)
    assert len(dev) >= 80


def test_passphrase_fallback_words():
    pp = generate_passphrase_fallback(5)
    assert pp.count("-") >= 4


def test_entropy_and_crack_time():
    e = entropy_bits_from_password("Aa1!")
    assert e > 0
    c, q = estimate_crack_time_bits(e)
    assert c > 0 and q > 0


