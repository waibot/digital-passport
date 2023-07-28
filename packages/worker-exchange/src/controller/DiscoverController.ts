import { Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class DiscoverCompactListAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Discover'],
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

export class DiscoverDappsAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Discover'],
    parameters: {
      categoryId: Query(Str, {
        description: '',
        example: '63522a884a8ed11c5aafe849',
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
