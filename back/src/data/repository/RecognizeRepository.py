from injector import inject, singleton
from yandex.cloud.ai.ocr.v1.ocr_service_pb2_grpc import (
    TextRecognitionServiceStub,
)
from yandex.cloud.ai.ocr.v1.ocr_service_pb2 import (
    RecognizeTextRequest,
    RecognizeTextResponse,
)
from yandex.cloud.ai.ocr.v1.ocr_pb2 import Vertex, Polygon, Line

from core import Config
from domain.entity import ImageTextFragment, ImageTextLine, ImageTextPoint


@singleton
class RecognizeRepository:
    @inject
    def __init__(self, stub: TextRecognitionServiceStub, config: Config) -> None:
        self._stub = stub
        self._config = config

    def recognize(self, content: bytes, type: str) -> list[ImageTextLine]:
        response: RecognizeTextResponse = self._stub.Recognize(
            RecognizeTextRequest(
                content=content,
                mime_type=type,
                language_codes=["*"],
            ),
            metadata=[("x-folder-id", self._config.folder_id)],
        ).next()

        return [
            _map_line(line)
            for block in response.text_annotation.blocks
            for line in block.lines
        ]


def _map_point(vertex: Vertex) -> ImageTextPoint:
    return ImageTextPoint(x=vertex.x, y=vertex.y)


def _map_fragment(polygon: Polygon) -> ImageTextFragment:
    return ImageTextFragment(
        p_1=_map_point(polygon.vertices[0]),
        p_2=_map_point(polygon.vertices[1]),
        p_3=_map_point(polygon.vertices[2]),
        p_4=_map_point(polygon.vertices[3]),
    )


def _map_line(line: Line) -> ImageTextLine:
    return ImageTextLine(
        text=line.text,
        fragment=_map_fragment(line.bounding_box),
    )
