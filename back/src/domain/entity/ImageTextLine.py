from dataclasses import dataclass

from domain.entity import ImageTextFragment


@dataclass
class ImageTextLine:
    text: str
    fragment: ImageTextFragment
