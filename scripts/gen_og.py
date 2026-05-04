"""Generates /public/images/og.png (1200x630) for Open Graph previews."""

from PIL import Image, ImageDraw, ImageFont
import math, os

OUT = os.path.join(os.path.dirname(__file__), "../public/images/og.png")
W, H = 1200, 630
BG      = (8, 8, 8)
WHITE   = (255, 255, 255)
MUTED   = (100, 100, 100)
ACCENT  = (60, 60, 60)

SF_BOLD   = "/System/Library/Fonts/SFNS.ttf"
SF_MONO   = "/System/Library/Fonts/SFNSMono.ttf"
HELVETICA = "/System/Library/Fonts/Helvetica.ttc"

def load(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except Exception:
        return ImageFont.load_default()

img  = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# ── subtle dot-grid background ─────────────────────────────────────────────
GRID = 32
for gx in range(0, W, GRID):
    for gy in range(0, H, GRID):
        draw.ellipse([gx-1, gy-1, gx+1, gy+1], fill=(20, 20, 20))

# ── top fade overlay (darkens dot grid near edges) ─────────────────────────
for i in range(120):
    alpha = int(180 * (1 - i / 120))
    draw.rectangle([0, 0, W, i],       fill=(8, 8, 8, alpha))
    draw.rectangle([0, H-i, W, H],     fill=(8, 8, 8, alpha))
    draw.rectangle([0, 0, i, H],       fill=(8, 8, 8, alpha))
    draw.rectangle([W-i, 0, W, H],     fill=(8, 8, 8, alpha))

# ── subtle horizontal rule ─────────────────────────────────────────────────
draw.rectangle([60, H//2 - 1, W - 60, H//2], fill=(30, 30, 30))

# ── eyebrow label ─────────────────────────────────────────────────────────
font_mono_sm = load(SF_MONO, 18)
eyebrow = "RAYVERAIMAR.GITHUB.IO"
draw.text((60, 60), eyebrow, font=font_mono_sm, fill=MUTED)

# ── name ──────────────────────────────────────────────────────────────────
font_name = load(SF_BOLD, 96)
name = "Rayver Muñoz Curi"
draw.text((60, 130), name, font=font_name, fill=WHITE)

# ── title ─────────────────────────────────────────────────────────────────
font_title = load(SF_BOLD, 36)
title = "Fullstack Engineer"
draw.text((62, 258), title, font=font_title, fill=(160, 160, 160))

# ── tech pills row ────────────────────────────────────────────────────────
font_pill = load(SF_MONO, 16)
pills = ["Django", "React", "TypeScript", "Rust", "PostgreSQL", "GCP"]
pill_x = 60
pill_y = 340
pill_pad_x, pill_pad_y = 14, 7
pill_gap = 10
pill_r = 6

for label in pills:
    bbox = draw.textbbox((0, 0), label, font=font_pill)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pw = tw + pill_pad_x * 2
    ph = th + pill_pad_y * 2

    # rounded rect background
    draw.rounded_rectangle(
        [pill_x, pill_y, pill_x + pw, pill_y + ph],
        radius=pill_r, fill=(22, 22, 22), outline=(45, 45, 45), width=1
    )
    draw.text((pill_x + pill_pad_x, pill_y + pill_pad_y), label, font=font_pill, fill=(140, 140, 140))
    pill_x += pw + pill_gap

# ── bottom meta row ───────────────────────────────────────────────────────
font_meta = load(SF_MONO, 16)
meta_items = ["Arequipa, Perú", "CS @ UCSP", "github.com/RayverAimar"]
meta_y = H - 70
meta_x = 60
for i, m in enumerate(meta_items):
    draw.text((meta_x, meta_y), m, font=font_meta, fill=(70, 70, 70))
    bbox = draw.textbbox((meta_x, meta_y), m, font=font_meta)
    meta_x = bbox[2] + 30
    if i < len(meta_items) - 1:
        draw.text((meta_x - 15, meta_y), "·", font=font_meta, fill=(45, 45, 45))

# ── RM monogram (top-right) ────────────────────────────────────────────────
box_size = 52
bx, by = W - 60 - box_size, 50
r = 10
draw.rounded_rectangle([bx, by, bx+box_size, by+box_size], radius=r,
                        fill=(14, 14, 14), outline=(50, 50, 50), width=1)
font_logo = load(SF_BOLD, 22)
draw.text((bx + 9, by + 13), "RM", font=font_logo, fill=(210, 210, 210))

# ── save ──────────────────────────────────────────────────────────────────
os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print(f"Saved → {OUT}  ({W}×{H})")
