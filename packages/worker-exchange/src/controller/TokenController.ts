import { Int, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class TokenListAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Token'],
    parameters: {
      impl: Query(Str, {
        description: '',
        example: 'evm',
      }),
      chainId: Query(Int, {
        description: '',
        example: '1',
      }),
      includeNativeToken: Query(Int, {
        description: '',
        example: '1',
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

export class TokenBalancesAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Token'],
    parameters: {
      network: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      address: Query(Str, {
        description: '',
        example: '0xd3121ef0a15a1cc02479d8ea83b6a1fbd67f08ab',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return proxyRequest(request, data, true);
  }
}

export class TokenDetailInfoAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Token'],
    parameters: {
      networkId: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      coingeckoId: Query(Str, {
        description: '',
        example: 'binance-usd',
      }),
      tokenAddress: Query(Str, {
        description: '',
        example: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
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

export class TokenDetailAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Token'],
    parameters: {
      impl: Query(Str, {
        description: '',
        example: 'evm',
      }),
      chainId: Query(Int, {
        description: '',
        example: '1',
      }),
      address: Query(Str, {
        description: '',
        example: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
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

export class TokenSecurityAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Token'],
    parameters: {
      networkId: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      apiName: Query(Str, {
        description: '',
        example: 'address_security',
      }),
      address: Query(Str, {
        description: '',
        example: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
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

export class TokenDetailBatchAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Token'],
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
