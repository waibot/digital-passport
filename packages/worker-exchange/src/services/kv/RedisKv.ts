import Redis from 'ioredis';

import BaseKv from './BaseKv';

export class RedisKv extends BaseKv {
  private client: Redis | null = null;

  private url: any;

  init(db: any) {
    this.url = db.url;
    return this;
  }

  connect() {
    this.client = new Redis(this.url || 'redis://127.0.0.1:6379/1');
    this.client.on('error', (err) => {
      throw new Error(`Redis Client Error: ${err.message}`);
    });

    return new Promise<void>((resolve, reject) => {
      this.client!.once('ready', () => {
        resolve();
      });

      this.client!.once('error', (err) => {
        reject(new Error(`Redis Client Connection Error: ${err.message}`));
      });
    });
  }

  async get(key: string): Promise<any> {
    try {
      if (!this.client) {
        await this.connect();
      }

      if (!this.client) {
        throw new Error('Redis client not initialized');
      }

      const res = await this.client.get(key);
      if (res) {
        return JSON.parse(res)[0];
      }
      return null;
    } catch (err) {
      console.error('Redis Get Error:', err);
      throw err;
    }
  }

  async put(key: string, value: any): Promise<boolean> {
    try {
      if (!this.client) {
        await this.connect();
      }

      if (!this.client) {
        throw new Error('Redis client not initialized');
      }

      const reply = await this.client.set(key, JSON.stringify([value]));
      return reply === 'OK';
    } catch (err) {
      console.error('Redis Put Error:', err);
      throw err;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      if (!this.client) {
        await this.connect();
      }

      if (!this.client) {
        throw new Error('Redis client not initialized');
      }

      const reply = await this.client.del(key);
      return reply > 0;
    } catch (err) {
      console.error('Redis Delete Error:', err);
      throw err;
    }
  }
}
