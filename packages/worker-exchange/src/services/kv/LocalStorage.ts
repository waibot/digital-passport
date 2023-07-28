import BaseKv from './BaseKv';

export default class LocalStorage extends BaseKv {
  private db: any;

  init() {
    this.db = window.localStorage;
    return this;
  }

  get(key: string) {
    return new Promise((resolve) => {
      resolve(this.db.getItem(key));
    });
  }

  async delete(key: string) {
    this.db.removeItem(key);
    return true;
  }

  async put(key: string, value: any) {
    this.db.setItem(key, value);
    return true;
  }
}
