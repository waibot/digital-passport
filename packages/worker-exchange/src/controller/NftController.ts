import { Int, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class NftTransactionsAccountV2Action extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      chain: Query(Str, {
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
    return proxyRequest(request, data);
  }
}

export class NftCollectionAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      contractAddress: Query(Str, {
        description: '',
        example: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
      }),
      showStatistics: Query(Str, {
        description: '',
        example: 'true',
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

export class NftCollectionAssetsAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      contractAddress: Query(Str, {
        description: '',
        example: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
      }),
      limit: Query(Int, {
        description: '',
        example: '5',
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

export class NftCollectionTransactionsAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      contractAddress: Query(Str, {
        description: '',
        example: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
      }),
      event_type: Query(Str, {
        description: '',
        example: 'sale',
      }),
      show_asset: Query(Str, {
        description: '',
        example: 'true',
      }),
      limit: Query(Int, {
        description: '',
        example: '5',
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

export class NftCollectionAttributesAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      contractAddress: Query(Str, {
        description: '',
        example: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
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
