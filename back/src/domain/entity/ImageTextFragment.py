from dataclasses import dataclass

from domain.entity import ImageTextPoint


@dataclass
class ImageTextFragment:
    p_1: ImageTextPoint
    p_2: ImageTextPoint
    p_3: ImageTextPoint
    p_4: ImageTextPoint

    @property
    def x_1(self):
        return min([p.x for p in self])

    @property
    def x_2(self):
        return max([p.x for p in self])

    @property
    def y_1(self):
        return min([p.y for p in self])

    @property
    def y_2(self):
        return max([p.y for p in self])

    def __iter__(self):
        return iter([self.p_1, self.p_2, self.p_3, self.p_4])