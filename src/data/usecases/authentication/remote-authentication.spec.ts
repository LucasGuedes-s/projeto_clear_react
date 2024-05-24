import { HttpPostClient } from "data/protocols/http/http-post-client"
import { promises } from "dns"
import { RemoteAuthentication } from "./remote-authentication"

describe('RemoteAuthentication', () =>{
    test('Should call HttpPostClient with correct URL', async () => {
        class HttpPostClientSpy implements HttpPostClient{
            url?: string
            async post (url: string): Promise<void> {
                this.url = url
                return Promise.resolve()
            }

        }
        const url = 'url'
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentication(url, httpPostClientSpy)
        sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})