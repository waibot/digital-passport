import KvTable from '../../models/rdms/KvTable';

import BaseKv from './BaseKv';

export default class MySqlKv extends BaseKv {
  private db: any;

  init(db: any) {
    this.db = new KvTable().setDb(db);
    return this;
  }

  async get(key: string) {
    try {
      const res = await this.db.getRow(key);
      if (res && res.value) {
        const value = res.value[0];
        console.debug('[kv get]', key, value);
        return value;
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async put(key: string, value: any) {
    try {
      console.debug('[kv put]', key, value);
      return this.db.saveRow({
        name: key,
        value: [value],
      });
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async delete(key: string) {
    console.debug('[kv delete]', key);
    try {
      return this.db.deleteRow(key);
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
