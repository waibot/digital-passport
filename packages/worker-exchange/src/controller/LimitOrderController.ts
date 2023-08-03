import { Int, Path, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyCovalentRequest } from '../helpers/ProxyRequest';

export class LimitOrderQueryOrdersAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['LimitOrder'],

    parameters: {
      'networkId': Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      'maker': Query(Str, {
        description: '',
        example: '0x2c81b8f3db7097e6a61c01fe184756316f3a3e7b',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return proxyCovalentRequest(request, data, false);
  }
}
