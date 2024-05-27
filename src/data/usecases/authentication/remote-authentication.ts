import { HttpPostClient } from "../../protocols/http/http-post-client";
import { AutenticationParametros } from "../../../domain/usecases/autentication";

export class RemoteAuthentication{
    constructor (
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient

    ) {}

    async auth(params: AutenticationParametros): Promise<void> {
        this.httpPostClient.post({
            url: this.url,
            body:params
        
        })
    }
}