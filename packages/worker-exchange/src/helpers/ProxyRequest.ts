import qs from 'qs';

import KvCache from '../services/kv/KvCache';

const resetHeader = (request: Request) => {
  const headersObject: Record<string, any> = {};
  // @ts-ignore
  for (const pair of request.headers.entries()) {
    if (
      !['origin', 'referer', 'content-length'].includes(pair[0].toLowerCase())
    ) {
      // eslint-disable-next-line prefer-destructuring
      headersObject[pair[0]] = pair[1];
    }
  }
  return headersObject;
};

const handleQueryAll = async (baseUrl: string, request: Request) => {
  const requestBody = await request.json();
  if (!requestBody) {
    return {};
  }
  const { tasks } = requestBody as {
    tasks: { address: string; networkId: string; scanType: string }[];
  };

  const nftItem = tasks.find(
    (p: { scanType: string }) => p.scanType === 'nfts',
  );

  if (!nftItem) {
    return {};
  }

  const headersObject: Record<string, any> = resetHeader(request);
  const { address, networkId: chain } = nftItem;
  const apiUrl = `${baseUrl}/api/NFT/v2/list?chain=${chain}&address=${address}`;
  const req = new Request(apiUrl, {
    headers: headersObject,
  });
  req.headers.delete('Host');
  req.headers.set('Host', new URL(apiUrl).hostname);
  const res = await fetch(req);
  const json = (await res.json()) as any;
  console.log('[res]', req.method, apiUrl, res.status, json);
  return {
    nfts: json.data.map((row: any) => ({
      networkId: chain,
      ...row,
    })),
  };
};

export async function proxyApiRequest(
  baseUrl: string,
  request: Request,
  data: Record<string, any>,
  realTime = false,
) {
  const url = new URL(request.url);

  let apiUrl = `${baseUrl}${url.pathname}`;
  if (apiUrl.endsWith('/transactions_v2')) {
    apiUrl += '/';
  }
  if (data && Object.keys(data).length > 0) {
    apiUrl += `?${qs.stringify(data)}`;
  }
  let cacheKey = apiUrl.replace('?', '_').replace(/&/g, '_');
  if (cacheKey.length > 254) {
    cacheKey = cacheKey.substring(0, 254);
  }

  if (!realTime && request.method.toLowerCase() === 'get') {
    const cache = await KvCache.getInstance().get(cacheKey);
    if (cache) {
      console.log('[from cache]', apiUrl);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return typeof cache === 'string' ? new Response(cache) : cache;
    }
  }
  let body;
  if (request.method.toLowerCase() === 'post') {
    const { pathname } = new URL(apiUrl);
    if (pathname === '/api/overview/subscribe') {
      return request.json();
    }
    if (pathname === '/api/overview/query/all') {
      return handleQueryAll(baseUrl, request);
    }
    body = JSON.stringify(await request.json());
    console.log('request.body1: ', apiUrl, body);
  }
  const headersObject: Record<string, any> = resetHeader(request);
  const req = new Request(apiUrl, {
    body,
    method: request.method,
    headers: headersObject,
  });
  req.headers.delete('Host');
  req.headers.set('Host', new URL(apiUrl).hostname);
  const res = await fetch(req);
  console.log('[res]', req.method, apiUrl, res.status, cacheKey.length);
  const contentType = res.headers.get('content-type');

  if (
    res.status === 200 &&
    contentType &&
    contentType?.indexOf('application/json') > -1
  ) {
    const json = await res.json();
    if (!realTime) {
      await KvCache.getInstance().put(cacheKey, json);
    }
    return json;
  }
  const text = await res.text();
  if (!realTime) {
    await KvCache.getInstance().put(cacheKey, text);
  }
  return new Response(text, {
    status: res.status,
  });
}

export function proxyRequest(
  request: Request,
  data: Record<string, any>,
  realTime = false,
) {
  return proxyApiRequest('https://api.onekeycn.com', request, data, realTime);
}

export function proxyCovalentRequest(
  request: Request,
  data: Record<string, any>,
  realTime = false,
) {
  return proxyApiRequest('https://node.onekey.so', request, data, realTime);
}
