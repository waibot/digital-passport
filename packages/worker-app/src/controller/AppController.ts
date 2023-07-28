import { Num, Query } from '@cloudflare/itty-router-openapi';
import qs from 'qs';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

export class AppConfigAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    parameters: {
      nocache: Query(Num, {
        description: 'nocache,such as: nocache=0.783534334042739',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const url = new URL(request.url);
    const apiUrl = `https://data.onekey.so${url.pathname}?${qs.stringify(
      data,
    )}`;
    const req = new Request(apiUrl, request);
    req.headers.delete('Host');
    req.headers.set('Host', new URL(apiUrl).hostname);
    return fetch(req);
  }
}
