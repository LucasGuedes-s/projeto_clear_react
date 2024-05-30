import { AccountModel } from "@/domain/models/AccountModel"

export type AutenticationParametros = {
    email: string
    password: string
}

export interface Autentication {
    auth (params: AutenticationParametros): Promise<AccountModel>
}