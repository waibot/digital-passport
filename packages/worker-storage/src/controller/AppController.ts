import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';
import KvCache from '@onekeyhq/worker-exchange/src/services/kv/KvCache';

export class AppCacheMarketCatListListAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const compactList = require('../../data/market/category/list-zh-CN.json');
    await KvCache.getInstance().put(
      'market_category_list_zh_CN',
      compactList[0],
    );
    return {
      rows: await KvCache.getInstance().get('market_category_list_zh_CN'),
    };
  }
}

export class AppCacheCacheCompactListAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const compactList = require('../../data/discover/compact_list.json');
    await KvCache.getInstance().put('discover_compact_list', compactList[0]);
    return {
      compactList: await KvCache.getInstance().get('discover_compact_list'),
    };
  }
}

export class AppCacheCacheCatDappAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const cats = {
      '634fa057b09822e6cc87303a': require(`../../data/discover/category_dapps_634fa057b09822e6cc87303a.json`),
      '634fa057b09822e6cc87303b': require(`../../data/discover/category_dapps_634fa057b09822e6cc87303b.json`),
      '634fa057b09822e6cc87303c': require(`../../data/discover/category_dapps_634fa057b09822e6cc87303c.json`),
      '634fa057b09822e6cc87303d': require(`../../data/discover/category_dapps_634fa057b09822e6cc87303d.json`),
      '634fa057b09822e6cc873038': require(`../../data/discover/category_dapps_634fa057b09822e6cc873038.json`),
      '634fa057b09822e6cc873039': require(`../../data/discover/category_dapps_634fa057b09822e6cc873039.json`),
      '634fa057b09822e6cc873040': require(`../../data/discover/category_dapps_634fa057b09822e6cc873040.json`),
      '63522a884a8ed11c5aafe849': require(`../../data/discover/category_dapps_63522a884a8ed11c5aafe849.json`),
    };
    const catsCache: Record<string, any> = {};
    for (const catId of Object.keys(cats)) {
      // @ts-ignore
      const row = cats[catId][0];
      await KvCache.getInstance().put(`discover_category_dapps_${catId}`, row);
      catsCache[catId] = await KvCache.getInstance().get(
        `discover_category_dapps_${catId}`,
      );
    }
    return {
      cats: catsCache,
    };
  }
}

export class AppCacheCacheTagDappAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const rows = {
      '634fa07920ec3e25ecd1ff25': require(`../../data/discover/tag_dapps_634fa07920ec3e25ecd1ff25.json`),
      '634fa07920ec3e25ecd1ff30': require(`../../data/discover/tag_dapps_634fa07920ec3e25ecd1ff30.json`),
    };
    const rowsCaches: Record<string, any> = {};
    for (const id of Object.keys(rows)) {
      // @ts-ignore
      const row = rows[id][0];
      await KvCache.getInstance().put(`discover_tag_dapps_${id}`, row);
      rowsCaches[id] = await KvCache.getInstance().get(
        `discover_tag_dapps_${id}`,
      );
    }
    return {
      tags: rowsCaches,
    };
  }
}
