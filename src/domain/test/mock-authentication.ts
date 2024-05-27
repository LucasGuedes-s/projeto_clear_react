import { AutenticationParametros } from "domain/usecases/autentication";
import { faker } from "@faker-js/faker";

export const mockAuthentication = (): AutenticationParametros => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})