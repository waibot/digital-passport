export const JSON_HEADERS = {
  'Content-Type': 'application/json',
};

export function getCorsOptionsHeader(allowOrigin = '*') {
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Accept, Authorization, ApiKey, Token, X-Request-By,x-onekey-request-id,Traceparent',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export function getCorsHeader(
  allowOrigin = '*',
  contentType = 'application/json;charset=UTF-8',
) {
  return {
    'content-type': contentType,
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods':
      'GET, POST, PUT, DELETE, OPTIONS,X-Request-By,x-onekey-request-id,Traceparent',
  };
}

export function ResponseJson(result: object, status = 200, allowOrigin = '*') {
  return new Response(JSON.stringify(result), {
    status,
    headers: {
      ...getCorsHeader(allowOrigin),
    },
  });
}

export function parseQueryFromUrl(urlStr: string): {
  url: URL;
  query: Record<string, string>;
} {
  const replacedUrl = urlStr.replace(/#/g, '?');
  const url = new URL(replacedUrl);
  const query = Array.from(url.searchParams.entries()).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {},
  );

  return { url, query };
}
