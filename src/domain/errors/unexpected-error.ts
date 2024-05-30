export class UnexpectedError extends Error {
    constructor(){
        super('Algo inexperado aconteceu. Tente novamente em breve')
        this.name = 'UnexpectedError'
    }
}