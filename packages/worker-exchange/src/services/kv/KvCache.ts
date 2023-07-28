import type BaseKv from './BaseKv';

let instanceInner: KvCache | null = null;
const instanceInners = new Map<string, KvCache>();

export default class KvCache {
  private handler?: BaseKv;

  static getInstance(key?: string) {
    if (!key) {
      if (!instanceInner) {
        instanceInner = new KvCache();
      }
      return instanceInner;
    }
    if (!instanceInners.has(key)) {
      instanceInners.set(key, new KvCache());
    }
    return instanceInners.get(key)!;
  }

  setKvHandler(handler: BaseKv) {
    this.handler = handler;
  }

  getKvHandler() {
    return this.handler;
  }

  async put(key: string, value: any) {
    return this.handler!.put(key, value);
  }

  async delete(key: string) {
    return this.handler!.delete(key);
  }

  async get(key: string) {
    return this.handler!.get(key);
  }
}
