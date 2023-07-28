import { Int, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class MarketTokenChartAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Market'],
    parameters: {
      coingeckoId: Query(Str, {
        description: '',
        example: 'bitcoin',
      }),
      days: Query(Str, {
        description: '',
        example: '1',
      }),
      vs_currency: Query(Str, {
        description: '',
        example: 'usd',
      }),
      points: Query(Int, {
        description: '',
        example: '100',
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
