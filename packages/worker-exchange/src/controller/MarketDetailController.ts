import { Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class MarketDetailAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Market'],
    parameters: {
      id: Query(Str, {
        description: '',
        example: 'bitcoin',
      }),
      vs_currency: Query(Str, {
        description: '',
        example: 'usd',
      }),
      locale: Query(Str, {
        description: '',
        example: 'zh-CN',
      }),
      explorer_platforms: Query(Str, {
        description: '',
        example: 'true',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    if (data.contract !== undefined && !data.contract) {
      delete data.contract;
    }
    return proxyRequest(request, data);
  }
}
