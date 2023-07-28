import DbStorage from '../../services/db/DbStorage';

import BaseTable from './BaseTable';

export type KvTableType = {
  name: string;
  value: any[];
};

export default class KvTable extends BaseTable {
  constructor() {
    super('wai_kv');
    this.setDb(DbStorage.getInstance('kv'));
  }

  async createTable() {
    if (this.isSqlite()) {
      await this.getDb().execute(
        `CREATE TABLE IF NOT EXISTS \`${this.getTable()}\` (\n` +
          `  \`name\` varchar(255) NOT NULL DEFAULT '',\n` +
          `  \`value\` json DEFAULT NULL,\n` +
          `  PRIMARY KEY (\`name\`)\n` +
          `)`,
      );
    } else {
      await this.getDb().execute(
        `CREATE TABLE IF NOT EXISTS \`${this.getTable()}\` (\n` +
          `  \`name\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',\n` +
          `  \`value\` text DEFAULT NULL,\n` +
          `  PRIMARY KEY (\`name\`)\n` +
          `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
      );
    }
  }

  async saveRow(row: KvTableType) {
    const update = this.isSqlite()
      ? 'ON CONFLICT(name) DO UPDATE SET value = excluded.value'
      : 'ON DUPLICATE KEY UPDATE  value = VALUES(value) ';
    const sql = `INSERT INTO ${this.getTable()} (name, value) VALUES (?, ?) ${update}`;
    try {
      const { name, value } = row;
      const newValue = this.isSqlite() ? JSON.stringify(value) : value;
      const params = [name, newValue];
      const result = await this.getDb().execute(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error adding row:', error);
      throw error;
    }
  }

  async getRow(name: string): Promise<KvTableType | null> {
    const sql = `SELECT * FROM ${this.getTable()} WHERE name = ? LIMIT 1`;
    try {
      const result = await this.getDb().query(sql, [name]);
      if (result.length > 0) {
        const res = result[0];
        return {
          name: res.name,
          value: this.isSqlite() ? JSON.parse(res.value) : res.value,
        } as KvTableType;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving row:', error);
      throw error;
    }
  }

  async deleteRow(name: string): Promise<any> {
    const sql = `DELETE FROM ${this.getTable()} WHERE name = ?`;
    try {
      const result = await this.getDb().execute(sql, [name]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting:', error);
      throw error;
    }
  }
}
