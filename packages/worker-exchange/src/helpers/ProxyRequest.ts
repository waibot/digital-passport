import qs from 'qs';

import KvCache from '../services/kv/KvCache';

export async function proxyRequest(
  request: Request,
  data: Record<string, any>,
) {
  const url = new URL(request.url);
  if (url.pathname.indexOf('lookup_ens_name') > 0) {
    return {};
  }
  let apiUrl = `https://api.onekeycn.com${url.pathname}`;
  if (data && Object.keys(data).length > 0) {
    apiUrl += `?${qs.stringify(data)}`;
  }
  const cacheKey = apiUrl.replace('?', '_').replace(/&/g, '_');
  if (request.method.toLowerCase() === 'get') {
    const cache = await KvCache.getInstance().get(cacheKey);
    if (cache) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cache;
    }
  }

  const req = new Request(apiUrl, request);
  req.headers.delete('Host');
  console.log('[req]', apiUrl);

  req.headers.set('Host', new URL(apiUrl).hostname);
  const res = await fetch(req);
  console.log(res.headers.get('content-length'));
  const json = await res.json();
  if (request.method.toLowerCase() === 'get') {
    await KvCache.getInstance().put(cacheKey, json);
  }
  return json;
}
