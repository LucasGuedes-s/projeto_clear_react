import { RemoteAuthentication } from "./remote-authentication"
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { faker } from '@faker-js/faker'
import { mockAuthentication } from "@/domain/test/mock-authentication"
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error"
import { HttpStatusCode } from "@/data/protocols/http/http-response"
import { UnexpectedError } from "@/domain/errors/unexpected-error"

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        sut,
        httpPostClientSpy
    }
}

describe('RemoteAuthentication', () =>{
    test('Should call HttpPostClient with correct URL', async () => {
        
        const url = faker.internet.url()
        const {sut, httpPostClientSpy} = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })
    test('Should call HttpPostClient with correct body', async () => {

        const {sut, httpPostClientSpy} = makeSut()
        const autenticacao = mockAuthentication()
        await sut.auth(autenticacao)
        expect(httpPostClientSpy.body).toEqual(autenticacao)
    })
    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {

        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.unathorized
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {

        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {

        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {

        const {sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
})