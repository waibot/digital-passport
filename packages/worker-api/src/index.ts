import { RandomAction } from '@onekeyhq/server/src/controller/ApiController';
import type { Environment } from '@onekeyhq/server/src/env';
import { IRouter } from '@onekeyhq/server/src/route';

const iRouter = new IRouter({
  title: 'Worker Api',
  version: '1.0.1',
}).setRoute((router: any) => {
  router.post('/api/utils/random', RandomAction);
});

const worker = {
  async fetch(request: Request, env: Environment) {
    iRouter.setEnv(env);
    return iRouter.handleRequest(request);
  },
};

export default worker;
