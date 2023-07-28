import { Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class NetworkChainListAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Swap'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return proxyRequest(request, data);
  }
}

export class NetworkLookupEnsNameAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Swap'],
    parameters: {
      address: Query(Str, {
        description: '',
        example: '0xD3121ef0a15A1Cc02479d8Ea83b6a1fBD67F08AB',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return proxyRequest(request, data);
  }
}
