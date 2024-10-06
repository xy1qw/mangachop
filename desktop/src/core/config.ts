import { config } from "dotenv"
import { singleton } from "tsyringe"

@singleton()
export class Config {
    constructor() {
        config({ path: "../.env" })
    }

    get host() {
        return `${process.env.URL}:${process.env.PORT}`
    }
}