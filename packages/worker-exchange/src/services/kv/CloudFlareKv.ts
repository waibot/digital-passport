import BaseKv from './BaseKv';

export default class CloudFlareKv extends BaseKv {
  private db: any;

  init(db: any) {
    this.db = db;
    return this;
  }

  async get(key: string) {
    try {
      const res = await this.db.get(key);
      let value: any = null;
      if (res) {
        const res1 = JSON.parse(res);
        if (res1.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          value = res1[0];
        }
      }
      console.debug('[kv get]', key);
      return value;
    } catch (e) {
      return null;
    }
  }

  async put(key: string, value: any) {
    try {
      console.debug('[kv put]', key);
      return this.db.put(key, JSON.stringify([value]));
    } catch (e) {
      return false;
    }
  }

  async delete(key: string) {
    console.debug('[kv delete]', key);
    try {
      await this.db.delete(key);
      return true;
    } catch (e) {
      return false;
    }
  }
}
