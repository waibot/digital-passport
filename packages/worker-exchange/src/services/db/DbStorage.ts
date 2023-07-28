import type BaseDb from './BaseDb';

let instanceInner: DbStorage | null = null;
const instanceInners = new Map<string, DbStorage>();

export default class DbStorage {
  private handler?: BaseDb;

  static getInstance(key?: string) {
    if (!key) {
      if (!instanceInner) {
        instanceInner = new DbStorage();
      }
      return instanceInner;
    }
    if (!instanceInners.has(key)) {
      instanceInners.set(key, new DbStorage());
    }
    return instanceInners.get(key)!;
  }

  getHandler() {
    return this.handler;
  }

  setHandler(handler: BaseDb) {
    this.handler = handler;
    return this;
  }

  async query(...args: any[]) {
    // console.log("[DbStorage query]",args)
    // @ts-ignore
    return this.handler!.query.apply(this.handler, args);
  }

  async execute(...args: any[]) {
    // console.log("[execute]",args)
    // @ts-ignore
    return this.handler!.execute.apply(this.handler, args);
  }
}
