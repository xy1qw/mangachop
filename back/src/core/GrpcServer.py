from concurrent import futures
import grpc
from injector import inject, singleton
from controller import ImageTranslateController
from core import Config


@singleton
class GrpcServer:
    @inject
    def __init__(
        self,
        config: Config,
        image_translate_controller: ImageTranslateController,
    ):
        self._config = config
        self._controllers = [image_translate_controller]
        self._server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    def start(self):
        for c in self._controllers:
            c.register(self._server)

        self._server.add_insecure_port(f"[::]:{self._config.port}")

        print(f"Server is running on port {self._config.port}...")

        self._server.start()
        self._server.wait_for_termination()
