import { Int, Query } from '@cloudflare/itty-router-openapi';
import { randomize } from 'worktop/utils';

import BaseOpenAPIRoute from '../base/BaseOpenAPIRoute';
import { ENV } from '../env';

export class RandomAction extends BaseOpenAPIRoute {
  static override schema = {
    tags: ['Utils'],
    parameters: {
      length: Query(Int, {
        description: 'Random key length',
        default: 16,
      }),
    },
    responses: {
      '200': {
        schema: {},
      },
    },
  };

  override async handle(request: Request, data: Record<string, any>) {
    const len = data.length;
    const { DATABASE_HOST, DATABASE_USERNAME } = ENV;
    return {
      random: Buffer.from(randomize(len)).toString('hex'),
      len,
      DATABASE_HOST,
      DATABASE_USERNAME,
    };
  }
}
