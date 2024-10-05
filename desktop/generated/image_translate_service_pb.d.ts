// package: 
// file: image_translate_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ImageTranslateRequest extends jspb.Message { 
    getImage(): Uint8Array | string;
    getImage_asU8(): Uint8Array;
    getImage_asB64(): string;
    setImage(value: Uint8Array | string): ImageTranslateRequest;
    getLanguage(): string;
    setLanguage(value: string): ImageTranslateRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageTranslateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ImageTranslateRequest): ImageTranslateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageTranslateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageTranslateRequest;
    static deserializeBinaryFromReader(message: ImageTranslateRequest, reader: jspb.BinaryReader): ImageTranslateRequest;
}

export namespace ImageTranslateRequest {
    export type AsObject = {
        image: Uint8Array | string,
        language: string,
    }
}

export class ImageTranslateResponse extends jspb.Message { 
    getImage(): Uint8Array | string;
    getImage_asU8(): Uint8Array;
    getImage_asB64(): string;
    setImage(value: Uint8Array | string): ImageTranslateResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageTranslateResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ImageTranslateResponse): ImageTranslateResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageTranslateResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageTranslateResponse;
    static deserializeBinaryFromReader(message: ImageTranslateResponse, reader: jspb.BinaryReader): ImageTranslateResponse;
}

export namespace ImageTranslateResponse {
    export type AsObject = {
        image: Uint8Array | string,
    }
}
