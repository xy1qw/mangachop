// package: 
// file: image_translate_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as image_translate_service_pb from "./image_translate_service_pb";

interface IImageTranslateServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    translate: IImageTranslateServiceService_ITranslate;
}

interface IImageTranslateServiceService_ITranslate extends grpc.MethodDefinition<image_translate_service_pb.ImageTranslateRequest, image_translate_service_pb.ImageTranslateResponse> {
    path: "/ImageTranslateService/Translate";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<image_translate_service_pb.ImageTranslateRequest>;
    requestDeserialize: grpc.deserialize<image_translate_service_pb.ImageTranslateRequest>;
    responseSerialize: grpc.serialize<image_translate_service_pb.ImageTranslateResponse>;
    responseDeserialize: grpc.deserialize<image_translate_service_pb.ImageTranslateResponse>;
}

export const ImageTranslateServiceService: IImageTranslateServiceService;

export interface IImageTranslateServiceServer extends grpc.UntypedServiceImplementation {
    translate: grpc.handleUnaryCall<image_translate_service_pb.ImageTranslateRequest, image_translate_service_pb.ImageTranslateResponse>;
}

export interface IImageTranslateServiceClient {
    translate(request: image_translate_service_pb.ImageTranslateRequest, callback: (error: grpc.ServiceError | null, response: image_translate_service_pb.ImageTranslateResponse) => void): grpc.ClientUnaryCall;
    translate(request: image_translate_service_pb.ImageTranslateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_translate_service_pb.ImageTranslateResponse) => void): grpc.ClientUnaryCall;
    translate(request: image_translate_service_pb.ImageTranslateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_translate_service_pb.ImageTranslateResponse) => void): grpc.ClientUnaryCall;
}

export class ImageTranslateServiceClient extends grpc.Client implements IImageTranslateServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public translate(request: image_translate_service_pb.ImageTranslateRequest, callback: (error: grpc.ServiceError | null, response: image_translate_service_pb.ImageTranslateResponse) => void): grpc.ClientUnaryCall;
    public translate(request: image_translate_service_pb.ImageTranslateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: image_translate_service_pb.ImageTranslateResponse) => void): grpc.ClientUnaryCall;
    public translate(request: image_translate_service_pb.ImageTranslateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: image_translate_service_pb.ImageTranslateResponse) => void): grpc.ClientUnaryCall;
}
