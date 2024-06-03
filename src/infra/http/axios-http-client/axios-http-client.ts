import { HttpPostParams } from "@/data/protocols/http/http-post-client";
import axios from "axios";

export class AxiosHttpClient {
    /*async post (params: HttpPostParams): Promise<void>{
        await axios(params.url)
    }*/
    async post (params: HttpPostParams): Promise<void>{
        await axios(params.url)
    }
}