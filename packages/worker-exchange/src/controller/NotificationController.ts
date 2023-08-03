import { Bool, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';
import KvCache from '../services/kv/KvCache';

export class NotificationFavoriteSaveAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Notification'],
    requestBody: {
      instanceId: new Str({
        required: true,
        example: 'abbbdcc8-bbb4-41d6-83d7-1e31e7e0845f',
      }),
      coingeckoId: new Str({ required: true, example: 'coingeckoId' }),
      symbol: new Str({ required: true, example: 'BTC' }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const { coingeckoId, instanceId, symbol } = data.body;

    let coins = (await KvCache.getInstance().get(
      `FAV_${instanceId}`,
    )) as string[];
    if (!coins) {
      coins = [];
    }
    if (!coins.includes(coingeckoId)) {
      coins.push(coingeckoId);
    }
    await KvCache.getInstance().put(`FAV_${instanceId}`, coins);
    return { coingeckoId };
  }
}
export class NotificationFavoriteDeleteAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Notification'],
    parameters: {
      instanceId: Query(Str, {
        description: '',
        example: 'xxx',
      }),
      coingeckoId: Query(Str, {
        description: '',
        example: 'bitcoin',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const { instanceId, coingeckoId } = data;
    let coins = (await KvCache.getInstance().get(
      `FAV_${instanceId}`,
    )) as string[];
    if (!coins) {
      coins = [];
    }
    if (coins.includes(coingeckoId)) {
      coins = coins.filter((id) => id !== coingeckoId);
    }
    await KvCache.getInstance().put(`FAV_${instanceId}`, coins);
    return {
      acknowledged: true,
      deletedCount: 0,
    };
  }
}

export class NotificationAccountDynamicSaveAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Notification'],
    requestBody: {
      accountId: new Str({
        required: true,
        example: 'watching--60--0xa5dff29bf5e20e361271d3ba67fb13d393b4149b',
      }),
      instanceId: new Str({
        required: true,
        example: 'abbbdcc8-bbb4-41d6-83d7-1e31e7e0845f',
      }),
      address: new Str({
        required: true,
        example: '0xa5dff29bf5e20e361271d3ba67fb13d393b4149b',
      }),
      name: new Str({ required: true, example: 'Account #1' }),
      passphrase: new Bool({ required: true, example: 'false' }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return data.body;
    // return proxyRequest(request, data);
  }
}
export class NotificationAccountDynamicAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Notification'],
    parameters: {
      instanceId: Query(Str, {
        description: '',
        example: 'abbbdcc8-bbb4-41d6-83d7-1e31e7e0845f',
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
