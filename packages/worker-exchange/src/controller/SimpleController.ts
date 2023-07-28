import { Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class SimplePriceAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Simple'],
    parameters: {
      vs_currency: Query(Str, {
        description: '',
        example: 'usd',
      }),
      platform: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      contracts: Query(Str, {
        required: false,
        description: '',
        example:
          '0xdac17f958d2ee523a2206206994597c13d831ec7,0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48,0x4fabb145d64652a948d72533023f6e7a623c7c53,0x6b175474e89094c44da98b954eedeac495271d0f',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    if (data.contracts !== undefined && !data.contracts) {
      delete data.contracts;
    }
    return proxyRequest(request, data);
  }
}
