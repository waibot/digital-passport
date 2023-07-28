import type { Environment } from '@onekeyhq/server/src/env';
import { ENV } from '@onekeyhq/server/src/env';
import { IRouter } from '@onekeyhq/server/src/route';

import {
  AppConfigAction,
  AppConfigSyncAction,
  AppConfigToolsV2Action,
  MoonPayUrlAction,
  RevokeLogsAction,
} from './controller/AppController';
import {
  DiscoverCompactListAction,
  DiscoverDappsAction,
} from './controller/DiscoverController';
import { ExchangeRatesVsCurrencies } from './controller/ExchangeRatesController';
import { MarketCategoryAction } from './controller/MarketCategoryController';
import { MarketChartAction } from './controller/MarketChartController';
import { MarketDetailAction } from './controller/MarketDetailController';
import { MarketTokenChartAction } from './controller/MarketTokenChartController';
import {
  MarketSearchAction,
  MarketTokensAction,
  MarketTokensBaseAction,
} from './controller/MarketTokensController';
import {
  NetworkChainListAction,
  NetworkLookupEnsNameAction,
} from './controller/NetworkController';
import {
  NftCollectionAction,
  NftCollectionAssetsAction,
  NftCollectionAttributesAction,
  NftCollectionTransactionsAction,
  NftTransactionsAccountV2Action,
} from './controller/NftController';
import {
  NftMarketCollectionAction,
  NftMarketLiveMintAction,
  NftMarketRankingAction,
} from './controller/NftMarketController';
import {
  NotificationAccountDynamicAction,
  NotificationFavoriteAction,
} from './controller/NotificationController';
import {
  OverviewQueryAllAction,
  OverviewSubscribeAction,
} from './controller/OverviewController';
import { SimplePriceAction } from './controller/SimpleController';
import { SwapConfigAction } from './controller/SwapController';
import {
  TokenBalancesAction,
  TokenDetailAction,
  TokenDetailBatchAction,
  TokenDetailInfoAction,
  TokenListAction,
  TokenSecurityAction,
} from './controller/TokenController';
import { TranslationsAllAction } from './controller/TranslationsController';
import CloudFlareKv from './services/kv/CloudFlareKv';
import KvCache from './services/kv/KvCache';

const iRouter = new IRouter({
  title: 'Worker Exchange',
  version: '1.0.1',
}).setRoute((router: any) => {
  router.get('/api/config/app', AppConfigAction);
  router.put('/api/config/sync', AppConfigSyncAction);
  router.get('/api/config/tools/v2', AppConfigToolsV2Action);

  router.get('/api/exchange_rates/vs_currencies', ExchangeRatesVsCurrencies);

  router.get('/api/market/chart', MarketChartAction);

  router.get('/api/market/detail', MarketDetailAction);
  router.get('/api/market/token/chart', MarketTokenChartAction);

  router.get('/api/market/tokens', MarketTokensAction);
  router.get('/api/market/search', MarketSearchAction);
  router.get('/api/market/tokens/base', MarketTokensBaseAction);
  router.get('/api/market/category/list', MarketCategoryAction);

  router.get('/api/simple/price', SimplePriceAction);

  router.get('/api/NFT/market/collection', NftMarketCollectionAction);
  router.get('/api/NFT/market/ranking', NftMarketRankingAction);
  router.get('/api/NFT/market/liveMint', NftMarketLiveMintAction);

  router.get('/api/NFT/collection', NftCollectionAction);
  router.get('/api/NFT/collection/assets', NftCollectionAssetsAction);
  router.get(
    '/api/NFT/collection/transactions',
    NftCollectionTransactionsAction,
  );
  router.get('/api/NFT/collection/attributes', NftCollectionAttributesAction);

  router.get('/api/NFT/transactions/accountV2', NftTransactionsAccountV2Action);

  router.get('/api/discover/compact_list', DiscoverCompactListAction);
  router.get('/api/discover/get_listing_category_dapps', DiscoverDappsAction);

  router.get('/api/translations/all', TranslationsAllAction);

  router.get('/api/token/list', TokenListAction);
  router.get('/api/token/balances', TokenBalancesAction);
  router.get('/api/token/detailInfo', TokenDetailInfoAction);
  router.get('/api/token/detail', TokenDetailAction);

  router.get('/api/token/detail', TokenDetailInfoAction);
  router.get('/api/token/security', TokenSecurityAction);
  router.post('/api/token/detail/batch', TokenDetailBatchAction);

  router.get('/api/swap/config', SwapConfigAction);

  router.post('/api/overview/subscribe', OverviewSubscribeAction);
  router.post('/api/overview/query/all', OverviewQueryAllAction);

  router.get('/api/network/chainlist', NetworkChainListAction);
  router.get('/api/network/lookup_ens_name', NetworkLookupEnsNameAction);

  router.post('/api/revoke/1/logs', RevokeLogsAction);

  router.get('/api/moonpay/url', MoonPayUrlAction);

  router.post('/api/notification/favorite', NotificationFavoriteAction);
  router.delete('/api/notification/favorite', NotificationFavoriteAction);
  router.get(
    '/api/notification/account-dynamic',
    NotificationAccountDynamicAction,
  );
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
