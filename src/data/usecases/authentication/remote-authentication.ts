import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

// casos de uso
// acessar http post client ou get client
export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  // passar os parametros
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    // validar a resposta
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as any
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
