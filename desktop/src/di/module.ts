import { container } from "tsyringe";
import { ChannelCredentials } from "@grpc/grpc-js"
import { ImageTranslateServiceClient } from "../generated/image_translate_service.client";
import { Config } from "../core/config";
import { GrpcTransport } from "@protobuf-ts/grpc-transport"


export function register() {
    const config = container.resolve(Config)

    const imageTranslateTransport = new GrpcTransport({
        host: config.host,
        channelCredentials: ChannelCredentials.createInsecure(),
    });

    container
        .register(ImageTranslateServiceClient, {
            useValue: new ImageTranslateServiceClient(imageTranslateTransport)
        })
}