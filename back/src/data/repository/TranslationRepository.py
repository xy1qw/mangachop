from injector import inject, singleton
from yandex.cloud.ai.translate.v2.translation_service_pb2 import (
    TranslateRequest,
    TranslateResponse,
)
from yandex.cloud.ai.translate.v2.translation_service_pb2_grpc import (
    TranslationServiceStub,
)

from core import Config

@singleton
class TranslationRepository:
    @inject
    def __init__(self, stub: TranslationServiceStub, config: Config) -> None:
        self._stub = stub
        self._config = config

    def translate(self, texts: list[str], target: str) -> list[str]:
        response: TranslateResponse = self._stub.Translate(
            TranslateRequest(
                folder_id=self._config.folder_id,
                texts=texts,
                target_language_code=target,
            )
        )

        return [e.text for e in response.translations]
