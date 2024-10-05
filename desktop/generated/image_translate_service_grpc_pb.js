// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var image_translate_service_pb = require('./image_translate_service_pb.js');

function serialize_ImageTranslateRequest(arg) {
  if (!(arg instanceof image_translate_service_pb.ImageTranslateRequest)) {
    throw new Error('Expected argument of type ImageTranslateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ImageTranslateRequest(buffer_arg) {
  return image_translate_service_pb.ImageTranslateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ImageTranslateResponse(arg) {
  if (!(arg instanceof image_translate_service_pb.ImageTranslateResponse)) {
    throw new Error('Expected argument of type ImageTranslateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ImageTranslateResponse(buffer_arg) {
  return image_translate_service_pb.ImageTranslateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ImageTranslateServiceService = exports.ImageTranslateServiceService = {
  translate: {
    path: '/ImageTranslateService/Translate',
    requestStream: false,
    responseStream: false,
    requestType: image_translate_service_pb.ImageTranslateRequest,
    responseType: image_translate_service_pb.ImageTranslateResponse,
    requestSerialize: serialize_ImageTranslateRequest,
    requestDeserialize: deserialize_ImageTranslateRequest,
    responseSerialize: serialize_ImageTranslateResponse,
    responseDeserialize: deserialize_ImageTranslateResponse,
  },
};

exports.ImageTranslateServiceClient = grpc.makeGenericClientConstructor(ImageTranslateServiceService);
