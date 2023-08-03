import { Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import KvCache from '../services/kv/KvCache';

export class DiscoverGetListingDapps extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Discover'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return [];
  }
}

export class DiscoverSearchDapps extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Discover'],
    parameters: {
      keyword: Query(Str, {
        description: '',
        example: 'about:blank',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return [];
  }
}

export class DiscoverCompactListAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Discover'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    return (await KvCache.getInstance().get('discover_compact_list')) || {};
  }
}

export class DiscoverDappsAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Discover'],
    parameters: {
      categoryId: Query(Str, {
        description: '',
        example: '63522a884a8ed11c5aafe849',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const { categoryId } = data;
    return (
      (await KvCache.getInstance().get(
        `discover_category_dapps_${categoryId}`,
      )) || []
    );
  }
}

export class DiscoverTagDappsAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Discover'],
    parameters: {
      tagId: Query(Str, {
        description: '',
        example: '634fa07920ec3e25ecd1ff25',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const { tagId } = data;
    return (
      (await KvCache.getInstance().get(`discover_tag_dapps_${tagId}`)) || []
    );
  }
}
