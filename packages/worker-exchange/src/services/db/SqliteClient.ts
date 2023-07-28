import sqlite3 from 'sqlite3';

import BaseDb from './BaseDb';

export class SqliteClient extends BaseDb {
  private config: {
    dbPath: ':memory:' | string;
  } | null = null;

  setConfig(config: { dbPath: string }): SqliteClient {
    this.config = config;
    return this;
  }

  getConnection() {
    if (!this.config) {
      throw new Error('Database configuration is not set');
    }
    return new sqlite3.Database(this.config.dbPath);
  }

  async query(sql: string, args?: any[]): Promise<any> {
    const conn = await this.getConnection();
    return new Promise((resolve, reject) => {
      conn.all(sql, args || [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async execute(sql: string, args?: any[]): Promise<any> {
    const conn = await this.getConnection();
    return new Promise((resolve, reject) => {
      conn.run(sql, args || [], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ affectedRows: this.changes, insertId: this.lastID });
        }
      });
    });
  }
}
