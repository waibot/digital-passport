import type { Environment } from '@onekeyhq/server/src/env';
import { IRouter } from '@onekeyhq/server/src/route';

import { AppConfigAction } from './controller/AppController';

const iRouter = new IRouter({
  title: 'Worker App',
  version: '1.0.1',
}).setRoute((router: any) => {
  router.get('/config.json', AppConfigAction);
});

const worker = {
  async fetch(request: Request, env: Environment) {
    iRouter.setEnv(env);
    return iRouter.handleRequest(request);
  },
};

export default worker;
