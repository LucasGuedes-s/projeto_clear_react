import { RemoteAuthentication } from "./remote-authentication"
import { HttpPostClientSpy } from "../../test/mock-http-client"
import { types } from "util"

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = 'url'): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () =>{
    test('Should call HttpPostClient with correct URL', async () => {
        const url = 'order-url'

        const {sut, httpPostClientSpy} = makeSut(url)

        sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})