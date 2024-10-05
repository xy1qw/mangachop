import grpc
from injector import Injector, provider, singleton, Module

from core import Config

from yandex.cloud.ai.ocr.v1.ocr_service_pb2_grpc import (
    TextRecognitionServiceStub,
)
from yandex.cloud.ai.translate.v2.translation_service_pb2_grpc import (
    TranslationServiceStub,
)
from yandexcloud import SDK


class YdexModule(Module):
    @provider
    @singleton
    def provide_sdk(self, injector: Injector) -> SDK:
        return SDK(token=injector.get(Config).token)

    @provider
    @singleton
    def provide_text_recognition_service_stub(
        self, injector: Injector
    ) -> TextRecognitionServiceStub:
        return injector.get(SDK).client(TextRecognitionServiceStub)

    @provider
    @singleton
    def provide_translation_service_stub(
        self, injector: Injector
    ) -> TranslationServiceStub:
        return injector.get(SDK).client(TranslationServiceStub)
