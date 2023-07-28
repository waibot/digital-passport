import { createConnection } from 'mysql2/promise';

import BaseDb from './BaseDb';

import type { Connection } from 'mysql2/promise';

export class MysqlClient extends BaseDb {
  private connection: Connection | null = null;

  private host: any;

  private user?: string;

  private password?: string;

  private database?: string;

  private port: number | undefined;

  setConfig(config: {
    host: string;
    user: string;
    port?: number;
    password: string;
    database: string;
  }) {
    this.host = config.host;
    this.user = config.user;
    this.port = config.port || 3306;
    this.password = config.password;
    this.database = config.database;
    return this;
  }

  async getConnection() {
    if (!this.connection) {
      const { host, user, password, database, port } = this;
      this.connection = await createConnection({
        host,
        user,
        port,
        password,
        database,
      });
    }
    return this.connection;
  }

  async query(sql: string, args?: any[]): Promise<any> {
    const connection = await this.getConnection();
    // console.debug(sql,args)
    const [rows] = await connection.query(sql, args || []);
    return rows;
  }

  async execute(sql: string, args?: any[]): Promise<any> {
    const connection = await this.getConnection();
    const res = await connection.execute(sql, args || []);
    return res[0];
  }
}
