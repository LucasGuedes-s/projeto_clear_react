import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { AutenticationParametros } from "@/domain/usecases/autentication";

export class RemoteAuthentication{
    constructor (
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient

    ) {}

    async auth(params: AutenticationParametros): Promise<void> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body:params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: break
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
}