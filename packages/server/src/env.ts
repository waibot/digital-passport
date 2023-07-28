export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

export type Environment = {
  KV_NAMESPACE_BINDING_KEY?: string;
  IS_DEV?: boolean;
  IN_ELECTRON?: boolean;
  SERVER_USER_ID_START?: string;
  Access_Control_Allow_Origin?: string;
  DTALK_ACCESS_TOKEN_PAY?: string;
  WECHAT_APPID?: string;
  WECHAT_APPSECRET?: string;
  WECHAT_NOTIFY_USER?: string;
  WECHAT_NOTIFY_TEMPLATE_ID?: string;
  TG_BOT_CHAT_ID_PAY?: string;
  TG_BOT_TOKEN_PAY?: string;
  DATABASE_HOST?: string;
  DATABASE_USERNAME?: string;
  DATABASE_PASSWORD?: string;
  SUPABASE_URL?: string;
  SUPABASE_KEY?: string;
  DATABASE_URL?: string;
};

let CTX_INNER: ExecutionContext = {
  waitUntil: () => {},
  passThroughOnException: () => {},
};

export const ENV: Environment = {
  IS_DEV: false,
  IN_ELECTRON: false,
  Access_Control_Allow_Origin: '*',
};

export function initEnv(env: Environment) {
  Object.assign(ENV, env);
}

export function setGlobalCtx(ctx: ExecutionContext) {
  CTX_INNER = ctx;
}

export function getAppEnvValue(key: keyof Environment) {
  return ENV[key];
}

export const CTX = CTX_INNER;
