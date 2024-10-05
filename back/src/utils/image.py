import io
from PIL import Image, ImageFont, ImageDraw
import numpy as np
from domain.entity import ImageTextLine


class ImageHelper:
    def __init__(self, image: bytes, font: str = None) -> None:
        self._img = Image.open(io.BytesIO(image))
        self._font_source = font

    @property
    def format(self):
        return self._img.format

    @property
    def draw(self):
        return ImageDraw.Draw(self._img)

    def replace_text(self, line: ImageTextLine, margin=10):
        c_box = (
            line.fragment.x_1,
            line.fragment.y_1,
            line.fragment.x_2,
            line.fragment.y_2,
        )

        x_1, y_1, x_2, y_2 = c_box

        c_with_m_box = (
            max(x_1 - margin, 0),
            max(y_1 - margin, 0),
            min(x_2 + margin, self._img.width),
            min(y_2 + margin, self._img.height),
        )

        xm_1, ym_1, xm_2, ym_2 = c_with_m_box

        background_color, font_color = self._get_colors(
            self._img.crop(c_with_m_box), margin
        )

        self.draw.rectangle(
            ((xm_1, ym_1), (xm_2, ym_2)),
            fill=background_color,
        )

        font, _, text_height = self._get_font(c_box, line.text)

        self.draw.text(
            (xm_1, ym_1 - (text_height // 2)),
            line.text,
            fill=font_color,
            font=font,
        )

    def _get_colors(self, img, margin, min_distance=50):
        margin_line = img.crop((0, 3, img.width, margin))
        middle_line = img.crop(
            (0, (img.height // 2) - 3, img.width, (img.height // 2) + 3)
        )

        margin_colors = margin_line.getcolors(margin_line.height * margin_line.width)
        middle_colors = middle_line.getcolors(middle_line.height * middle_line.width)

        _, background_color = max(margin_colors, key=lambda k: k[0])

        font_color = None
        _count = 0

        for count, color in middle_colors:
            distance = np.linalg.norm(
                np.array(background_color[:3]) - np.array(color[:3])
            )

            if distance > min_distance and (not font_color or _count < count):
                font_color = color
                _count = count

        return (background_color, font_color)

    def _get_font(self, box, text):
        width, height = self.get_size(*box)

        font_size = height

        while True:
            font = ImageFont.truetype(self._font_source, size=font_size)

            text_width, text_height = self.get_size(
                *self.draw.textbbox((0, 0), text, font=font)
            )

            if height - 3 > text_height and width - 3 > text_width:
                font_size += 1
            elif height < text_height or width < text_width:
                font_size -= 1
            else:
                break

        return (font, text_width, text_height)

    def get_size(self, x_1, y_1, x_2, y_2):
        return (x_2 - x_1, y_2 - y_1)

    def to_bytes(self):
        img_io = io.BytesIO()

        self._img.save(img_io, format=self.format)
        img_io.seek(0)

        return img_io.read()
