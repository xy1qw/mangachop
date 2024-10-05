import grpc
from injector import Injector

from core import GrpcServer
from di import YdexModule
from concurrent import futures


def main():
    injector = Injector([YdexModule()])
    injector.get(GrpcServer).start()


if __name__ == "__main__":
    main()

# grpcurl -plaintext \
# -d '{"image": "'$(curl -s https://fsd.kopilkaurokov.ru/up/html/2019/03/21/k_5c936a76552c7/img_user_file_5c936a7701748_9.jpg | base64)'","language": "en"}' \
# localhost:50051 image_translate_service.ImageTranslateService/Translate
