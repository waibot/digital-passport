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
        example: '0xfe9b7a9072f2e089fc0891489bd0dacb620abe0b',
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
        required: false,
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
    if (data.showStatistics !== undefined && !data.showStatistics) {
      delete data.showStatistics;
    }
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
        required: false,
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
    if (data.show_asset !== undefined && !data.show_asset) {
      delete data.show_asset;
    }
    return proxyRequest(request, data);
  }
}

export class NftBatchAssetAction extends BaseOpenAPIRoute {
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

export class NftAssetAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      contractAddress: Query(Str, {
        description: '',
        example: '0xd4416b13d2b3a9abae7acd5d6c2bbdbe25686401',
      }),
      tokenId: Query(Str, {
        description: '',
        example:
          '63222437808420962301404778764209419205480461766560086218039246059825260000457',
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

export class NftV2ListAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      chain: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      address: Query(Str, {
        description: '',
        example: '0xa75e6d98579da0899cbd3d87d74aa90ef641be22',
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

export class NftAccountPnlAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['NFT'],
    parameters: {
      address: Query(Str, {
        description: '',
        example: '0xa75e6d98579da0899cbd3d87d74aa90ef641be22',
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
