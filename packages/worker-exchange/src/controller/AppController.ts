import { Num, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class AppConfigAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    parameters: {
      version: Query(Str, {
        description: '',
        example: '4.10.0',
      }),
      networkUpdateTimestamp: Query(Num, {
        description: '',
        example: '1690257773448',
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    data.networkUpdateTimestamp = 1690257773448;
    return proxyRequest(request, data);
  }
}

export class AppConfigSyncAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle() {
    return {};
  }
}

export class AppConfigToolsV2Action extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle() {
    return {};
  }
}

export class RevokeLogsAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
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

export class MoonPayUrlAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['App'],
    parameters: {
      type: Query(Str, {
        description: '',
        example: 'buy',
      }),
      tokenAddress: Query(Str, {
        description: '',
        example: '0x6e9730ecffbed43fd876a264c982e254ef05a0de',
      }),
      networkId: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      mode: Query(Str, {
        description: '',
        example: 'live',
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
