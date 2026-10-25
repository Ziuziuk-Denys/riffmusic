"""Turn the Riff app icon into a flat black silhouette with no glow.

A pixel joins the shape by its alpha-weighted luminance, smoothed between
`low` and `high`. Usage: python3 scripts/icon-silhouette.py in.png out.png
"""

import sys

from PIL import Image


def silhouette(source: Image.Image, low: float = 0.55, high: float = 0.9) -> Image.Image:
    rgba = source.convert("RGBA")
    out = Image.new("RGBA", rgba.size)
    pixels = []
    for red, green, blue, alpha in rgba.get_flattened_data():
        luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255
        t = (alpha / 255 * luminance - low) / (high - low)
        t = min(1.0, max(0.0, t))
        t = t * t * (3 - 2 * t)
        pixels.append((0, 0, 0, round(t * 255)))
    out.putdata(pixels)
    return out


if __name__ == "__main__":
    assert silhouette(Image.new("RGBA", (1, 1), (255, 255, 255, 255))).getpixel((0, 0))[3] == 255
    assert silhouette(Image.new("RGBA", (1, 1), (0, 0, 0, 255))).getpixel((0, 0))[3] == 0
    silhouette(Image.open(sys.argv[1])).save(sys.argv[2])
