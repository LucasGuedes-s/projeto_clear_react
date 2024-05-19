import { AccountModel } from "domain/models/AccountModel"

type AutenticationParametros = {
    email: string
    password: string
}

export interface Autentication {
    auth (params: AutenticationParametros): Promise<AccountModel>
}