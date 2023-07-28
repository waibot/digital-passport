import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class SwapConfigAction extends BaseOpenAPIRoute {
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
