import { Int, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class NftMarketCollectionAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
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

export class NftMarketRankingAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      time: Query(Str, {
        description: '',
        example: '1d',
      }),
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
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

export class NftMarketLiveMintAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      limit: Query(Int, {
        description: '',
        example: '5',
      }),
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
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

export class NftMarketMarketCapMintAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      limit: Query(Int, {
        description: '',
        example: '5',
      }),
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
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

export class NftMarketPlaceListAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
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
