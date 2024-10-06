import { ImageTranslateServiceClient } from "../generated/image_translate_service.client";
import { injectable } from "tsyringe";

@injectable()
export class ImageTranslateService {
    constructor(private client: ImageTranslateServiceClient) { }

    translate = async (image: Uint8Array, language: string) => {
        const call = this.client.translate({ image, language });
        return (await call.response).image
    }
}