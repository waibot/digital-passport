import { Int, Path, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyCovalentRequest } from '../helpers/ProxyRequest';

export class CovalentaTransactionsAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Covalenta'],

    parameters: {
      'address': Path(Str, {
        description: '',
        example: '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
      }),
      'page-number': Query(Int, {
        description: '',
        example: '0',
      }),
      'page-size': Query(Int, {
        description: '',
        example: '50',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    delete data.address;
    return proxyCovalentRequest(request, data, false);
  }
}
