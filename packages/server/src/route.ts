import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';

import { getCorsOptionsHeader } from '@onekeyhq/sdk/src/common/http';
import { SWAGGER_DOC } from '@onekeyhq/sdk/src/common/swagger';

import BaseOpenAPIRoute from './base/BaseOpenAPIRoute';
import { ENV, initEnv, setGlobalCtx } from './env';

import type { Environment, ExecutionContext } from './env';
import type {
  OpenAPIRouteSchema,
  OpenAPIRouterSchema,
} from '@cloudflare/itty-router-openapi';

export class IRouter {
  private version?: string;

  private title: string;

  private router: any;

  constructor(info: { title: string; version?: string }) {
    this.title = info.title;
    this.version = info.version;
  }

  getInfo() {
    return {
      title: this.title,
      version: this.version || '1.0.1',
    };
  }

  setRoute(iRoute: (router: OpenAPIRouterSchema) => void) {
    const router = OpenAPIRouter({
      ...SWAGGER_DOC,
      schema: {
        ...SWAGGER_DOC.schema,
        info: {
          ...this.getInfo(),
        },
      },
    });
    this.router = router;
    iRoute(router);
    router.original.get('/', (request: Request) =>
      Response.redirect(`${request.url}docs`, 302),
    );
    const allHandler = () => new Response('Not Found.', { status: 404 });
    // @ts-ignore
    router.all('*', allHandler as OpenAPIRouteSchema);
    return this;
  }

  setEnv(env: Environment) {
    initEnv(env);
    return this;
  }

  setCtx(ctx: ExecutionContext) {
    setGlobalCtx(ctx);
    return this;
  }

  async handleRequest(request: Request) {
    try {
      if (request.method === 'OPTIONS') {
        return new Response('', {
          headers: {
            ...getCorsOptionsHeader(ENV.Access_Control_Allow_Origin),
          },
        });
      }
      // eslint-disable-next-line  @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      return this.router.handle(request);
    } catch (e) {
      console.log('router handle ERROR', e);
      return BaseOpenAPIRoute.responseJson(
        {
          status: 500,
        },
        500,
      );
    }
  }
}
