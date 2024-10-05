from injector import inject, singleton
from domain.service import TranslationService
from grpc_reflection.v1alpha import reflection

from generated.image_translate_service_pb2 import (
    ImageTranslateResponse,
    DESCRIPTOR,
)
from generated.image_translate_service_pb2_grpc import (
    ImageTranslateServiceServicer,
    add_ImageTranslateServiceServicer_to_server,
)


@singleton
class ImageTranslateController(ImageTranslateServiceServicer):
    @inject
    def __init__(self, service: TranslationService) -> None:
        self._service = service
        super().__init__()

    def Translate(self, request, _):
        new_image = self._service.translate(request.image, request.language)

        return ImageTranslateResponse(image=new_image)

    def register(self, server):
        add_ImageTranslateServiceServicer_to_server(self, server)

        reflection.enable_server_reflection(
            (
                DESCRIPTOR.services_by_name["ImageTranslateService"].full_name,
                reflection.SERVICE_NAME,
            ),
            server,
        )
