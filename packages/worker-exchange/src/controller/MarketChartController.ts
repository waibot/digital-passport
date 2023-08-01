import { Int, Query, Str } from '@cloudflare/itty-router-openapi';

import BaseOpenAPIRoute from '@onekeyhq/server/src/base/BaseOpenAPIRoute';

import { proxyRequest } from '../helpers/ProxyRequest';

export class MarketChartAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Market'],
    parameters: {
      platform: Query(Str, {
        description: '',
        example: 'evm--1',
      }),
      days: Query(Str, {
        description: '',
        example: '1',
      }),
      vs_currency: Query(Str, {
        description: '',
        example: 'usd',
      }),
      contract: Query(Str, {
        required: false,
        description: 'contract address',
        example: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      }),
      points: Query(Int, {
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
    if (data.contract !== undefined && !data.contract) {
      delete data.contract;
    }
    if (data.points !== undefined && !data.points) {
      delete data.points;
    }
    return proxyRequest(request, data);
  }
}
