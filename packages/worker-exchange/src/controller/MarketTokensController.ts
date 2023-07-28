import { Int, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class MarketTokensAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Market'],
    parameters: {
      category: Query(Str, {
        description: '',
        required: false,
        example: 'favorites',
      }),
      vs_currency: Query(Str, {
        description: '',
        example: 'usd',
      }),
      ids: Query(Str, {
        required: false,
        description: '',
        example:
          'bitcoin,ethereum,binancecoin,ripple,cardano,solana,dogecoin,polkadot,shiba-inu,pancakeswap-token,pha,terra-luna',
      }),
      sparkline: Query(Str, {
        description: '',
        example: 'true',
      }),
      sparklinePoints: Query(Int, {
        required: false,
        description: '',
        example: '100',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    if (data.ids !== undefined && !data.ids) {
      delete data.ids;
    }
    if (data.category !== undefined && !data.category) {
      delete data.category;
    }

    if (data.sparklinePoints !== undefined && !data.sparklinePoints) {
      delete data.sparklinePoints;
    }

    return proxyRequest(request, data);
  }
}

export class MarketTokensBaseAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Market'],
    parameters: {
      coingeckoIds: Query(Str, {
        description: '',
        example:
          'bitcoin,ethereum,binancecoin,ripple,cardano,solana,dogecoin,polkadot,shiba-inu,pancakeswap-token,pha,terra-luna',
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

export class MarketSearchAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Market'],
    parameters: {
      query: Query(Str, {
        description: '',
        example: '',
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
