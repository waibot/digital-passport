import type { Environment } from '@onekeyhq/server/src/env';
import { ENV } from '@onekeyhq/server/src/env';
import { IRouter } from '@onekeyhq/server/src/route';
import CloudFlareKv from '@onekeyhq/worker-exchange/src/services/kv/CloudFlareKv';
import KvCache from '@onekeyhq/worker-exchange/src/services/kv/KvCache';

import {
  AppCacheCacheCatDappAction,
  AppCacheCacheCompactListAction,
  AppCacheCacheTagDappAction,
  AppCacheMarketCatListListAction,
} from './controller/AppController';

const iRouter = new IRouter({
  title: 'Worker storage',
  version: '1.0.1',
}).setRoute((router: any) => {
  router.get('/api/cache_market_cat_list', AppCacheMarketCatListListAction);
  router.get('/api/cache_compactList', AppCacheCacheCompactListAction);
  router.get('/api/cache_tag_dapp', AppCacheCacheTagDappAction);
  router.get('/api/cache_cat_dapp', AppCacheCacheCatDappAction);
});

const worker = {
  async fetch(request: Request, env: Environment) {
    iRouter.setEnv(env);
    // @ts-ignore
    const kv = ENV[ENV.KV_NAMESPACE_BINDING_KEY];
    KvCache.getInstance().setKvHandler(new CloudFlareKv().init(kv));
    return iRouter.handleRequest(request);
  },
};

export default worker;
