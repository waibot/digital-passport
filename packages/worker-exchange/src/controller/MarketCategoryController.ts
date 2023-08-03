import { Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import KvCache from '../services/kv/KvCache';

export class MarketCategoryAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Market'],
    parameters: {
      locale: Query(Str, {
        description: '',
        example: 'zh-CN',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return (
      (await KvCache.getInstance().get('market_category_list_zh_CN')) || []
    );
  }
}
