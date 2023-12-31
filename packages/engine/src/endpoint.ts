const endpointsMap: Record<
  'fiat' | 'wss' | 'covalent' | 'mempool' | 'getblock',
  { prd: string; test: string }
> = {
  fiat: {
    prd: 'https://dp-api.wai.chat/api',
    test: 'http://localhost:4083/api',
  },
  wss: {
    prd: 'wss://api.onekeycn.com',
    test: 'wss://api-sandbox.onekeytest.com',
  },
  covalent: {
    prd: 'https://dp-api.wai.chat/covalent/client1-HghTg3a33',
    test: 'http://localhost:4083/covalent/client1-HghTg3a33',
  },
  mempool: {
    prd: 'https://node.onekey.so/mempool',
    test: 'https://node.onekeytest.com/mempool',
  },
  getblock: {
    prd: 'https://node.onekey.so/getblock-{chain}-{network}',
    test: 'https://node.onekeytest.com/getblock-{chain}-{network}',
  },
};

let endpointType: 'prd' | 'test' = 'prd';
export const switchTestEndpoint = (isTestEnable?: boolean) => {
  endpointType = isTestEnable ? 'test' : 'prd';
};

switchTestEndpoint(false);

export const getFiatEndpoint = () => endpointsMap.fiat[endpointType];
export const getSocketEndpoint = () => endpointsMap.wss[endpointType];
export const getCovalentApiEndpoint = () => endpointsMap.covalent[endpointType];

export function getMempoolEndpoint({
  network,
}: {
  network: 'mainnet' | 'testnet';
}) {
  const networkPath = network === 'mainnet' ? '' : network;
  return [endpointsMap.mempool[endpointType], networkPath]
    .filter(Boolean)
    .join('/');
}

export function getGetblockEndpoint({
  chain,
  network,
}: {
  chain: 'btc';
  network: 'mainnet' | 'testnet';
}) {
  return endpointsMap.getblock[endpointType]
    .replace('{chain}', chain)
    .replace('{network}', network);
}
