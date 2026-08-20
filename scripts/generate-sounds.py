#!/usr/bin/env python3
"""Synthesize page-turn rustle and a high church-choir 'ahhhh'."""

from __future__ import annotations

import math
import os
import subprocess
import wave

import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "sounds")


def write_wav(path: str, stereo: np.ndarray) -> None:
    stereo = np.clip(stereo, -1.0, 1.0)
    pcm = (stereo * 32767.0).astype(np.int16)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with wave.open(path, "w") as fh:
        fh.setnchannels(2)
        fh.setsampwidth(2)
        fh.setframerate(SR)
        fh.writeframes(pcm.tobytes())


def to_mp3(wav_path: str, mp3_path: str) -> None:
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-i",
            wav_path,
            "-codec:a",
            "libmp3lame",
            "-q:a",
            "4",
            mp3_path,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def envelope(n: int, attack: float, release: float) -> np.ndarray:
    a = int(attack * SR)
    r = int(release * SR)
    env = np.ones(n, dtype=np.float64)
    if a > 0:
        env[:a] = np.linspace(0.0, 1.0, a) ** 1.4
    if r > 0:
        env[-r:] = np.linspace(1.0, 0.0, r) ** 1.6
    return env


def highpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    rc = 1.0 / (2 * math.pi * cutoff)
    dt = 1.0 / SR
    alpha = rc / (rc + dt)
    y = np.zeros_like(x)
    prev_x = x[0]
    prev_y = 0.0
    for i, sample in enumerate(x):
        prev_y = alpha * (prev_y + sample - prev_x)
        y[i] = prev_y
        prev_x = sample
    return y


def lowpass(x: np.ndarray, cutoff: float) -> np.ndarray:
    rc = 1.0 / (2 * math.pi * cutoff)
    dt = 1.0 / SR
    alpha = dt / (rc + dt)
    y = np.zeros_like(x)
    acc = 0.0
    for i, sample in enumerate(x):
        acc += alpha * (sample - acc)
        y[i] = acc
    return y


def bandpass(x: np.ndarray, lo: float, hi: float) -> np.ndarray:
    return highpass(lowpass(x, hi), lo)


def formant_gain(freq: float) -> float:
    # Bright soprano/alto "ah": F1~850, F2~1400, F3~2800, F4~4300
    peaks = ((850, 90, 1.0), (1400, 110, 0.85), (2800, 160, 0.45), (4300, 220, 0.22))
    g = 0.04
    for center, width, amp in peaks:
        g += amp * math.exp(-0.5 * ((freq - center) / width) ** 2)
    return g


def choir_voice(t: np.ndarray, f0: float, seed: int) -> np.ndarray:
    rng = np.random.default_rng(seed)
    detune = rng.uniform(-0.006, 0.006)
    vib_hz = rng.uniform(4.8, 5.6)
    vib_cents = rng.uniform(6.0, 11.0)
    vib = np.sin(2 * math.pi * vib_hz * t + rng.uniform(0, math.pi))
    freq = f0 * (1.0 + detune) * (2.0 ** ((vib * vib_cents) / 1200.0))
    phase = np.cumsum(freq) * (2 * math.pi / SR)
    sig = np.zeros_like(t)
    for n in range(1, 18):
        fn = n * f0
        if fn > 9000:
            break
        amp = formant_gain(fn) / (n**1.2)
        sig += amp * np.sin(n * phase + rng.uniform(0, 0.4))
    breath = rng.normal(0, 0.012, t.size)
    breath = bandpass(breath, 1800, 6000)
    return sig + breath * 0.15


def church_reverb(x: np.ndarray) -> np.ndarray:
    delays = [1453, 1723, 2083, 2467, 2903, 3323]
    out = x.copy()
    for i, d in enumerate(delays):
        decay = 0.38 - i * 0.04
        padded = np.concatenate([np.zeros(d), x[:-d] if d < x.size else np.zeros(x.size)])
        if padded.size != x.size:
            padded = padded[: x.size]
        out += decay * padded
    return out * 0.55


def make_choir() -> np.ndarray:
    # High treble choir: altos/sopranos only. No tenor/bass (those sounded guttural).
    duration = 1.85
    t = np.arange(int(duration * SR)) / SR
    parts = [493.88, 659.25, 783.99, 987.77, 1318.51]
    mix = np.zeros_like(t)
    for i, f0 in enumerate(parts):
        for extra in range(3):
            mix += choir_voice(t, f0, seed=100 + i * 10 + extra) * (0.22 if f0 < 700 else 0.18)
    mix = highpass(mix, 280)
    mix = lowpass(mix, 8200)
    env = envelope(mix.size, attack=0.28, release=0.55)
    mix *= env
    mix = church_reverb(mix)
    mix = highpass(mix, 240)
    peak = np.max(np.abs(mix)) or 1.0
    mix = mix / peak * 0.78
    delay = int(0.014 * SR)
    left = mix
    right = np.concatenate([np.zeros(delay), mix[:-delay]])
    return np.stack([left, right], axis=1)


def make_page_turn() -> np.ndarray:
    duration = 0.62
    n = int(duration * SR)
    rng = np.random.default_rng(7)

    noise = rng.normal(0, 1, n)
    rustle = bandpass(noise, 700, 5200)
    spikes = rng.random(n) > 0.997
    crackle = np.zeros(n)
    crackle[spikes] = rng.uniform(-1, 1, int(spikes.sum()))
    crackle = bandpass(crackle, 1200, 8000)

    lift = envelope(n, attack=0.018, release=0.42)
    lift[: int(0.09 * SR)] *= np.linspace(0.4, 1.0, int(0.09 * SR)) ** 0.5
    whoosh = bandpass(rng.normal(0, 1, n), 300, 1600) * envelope(n, 0.05, 0.28)
    land_at = int(0.46 * SR)
    land = np.zeros(n)
    land_len = int(0.08 * SR)
    land[land_at : land_at + land_len] = bandpass(rng.normal(0, 1, land_len), 180, 900)
    land *= envelope(n, 0.001, 0.12)

    sig = rustle * 0.55 * lift + crackle * 0.35 * lift + whoosh * 0.22 + land * 0.28
    sig = highpass(sig, 160)
    peak = np.max(np.abs(sig)) or 1.0
    sig = sig / peak * 0.85
    delay = int(0.006 * SR)
    right = np.concatenate([np.zeros(delay), sig[:-delay]])
    return np.stack([sig, right * 0.92], axis=1)


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    choir = make_choir()
    choir_wav = os.path.join(OUT, "cover-choir-src.wav")
    write_wav(choir_wav, choir)
    stretched = os.path.join(OUT, "cover-choir.wav")
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-i",
            choir_wav,
            "-filter:a",
            "atempo=0.714285",
            stretched,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    page = make_page_turn()
    page_wav = os.path.join(OUT, "page-turn.wav")
    write_wav(page_wav, page)
    to_mp3(stretched, os.path.join(OUT, "cover-choir.mp3"))
    to_mp3(page_wav, os.path.join(OUT, "page-turn.mp3"))
    os.remove(choir_wav)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
