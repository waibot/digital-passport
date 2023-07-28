import { Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class NotificationFavoriteAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Notification'],
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

export class NotificationAccountDynamicAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Notification'],
    parameters: {
      instanceId: Query(Str, {
        description: '',
        example: 'xxx',
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
