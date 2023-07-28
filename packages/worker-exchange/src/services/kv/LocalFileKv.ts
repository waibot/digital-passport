import fs from 'fs';
import path from 'path';
import util from 'util';

import BaseKv from './BaseKv';

// LocalFileKv 类继承自 BaseKv 抽象类
export default class LocalFileKv extends BaseKv {
  private dbPath?: string; // 用于存储本地文件的目录路径

  private getDbPath() {
    return this.dbPath!;
  }

  // 初始化方法，在这里设置数据库路径
  init(db: any) {
    if (!db.endsWith('/')) {
      db += '/';
    }
    this.dbPath = `${db}kv`;

    // 如果数据库目录不存在，那么创建它
    if (!fs.existsSync(this.getDbPath())) {
      fs.mkdirSync(this.getDbPath(), { recursive: true });
    }
    return this;
  }

  formatFilePath(f: string) {
    return f
      .split('/')
      .slice(f.split('/').length - 2)
      .join('/');
  }

  // 获取键值
  async get(key: string) {
    const readFile = util.promisify(fs.readFile);
    // 构建文件路径，key作为文件名
    const filePath = path.join(this.getDbPath(), `${key}.json`);
    // 尝试读取文件内容
    try {
      const fileContent = await readFile(filePath);
      console.debug(
        '[GET]',
        this.formatFilePath(filePath),
        fileContent.toString(),
      );
      let value: any = null;
      if (fileContent) {
        const res = JSON.parse(fileContent.toString());
        if (res.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          value = res[0];
        }
      }
      return value;
      // 将文件内容解析为JSON对象并返回
    } catch (error) {
      // 在读取文件时发生错误，例如文件不存在，返回 null
      return null;
    }
  }

  // 存储键值对
  async put(key: string, value: any) {
    const writeFile = util.promisify(fs.writeFile);
    // 构建文件路径，key作为文件名
    const filePath = path.join(this.getDbPath(), `${key}.json`);
    // 将值转换为 JSON 字符串
    const valueStr = JSON.stringify([value]);
    console.debug('[PUT]', this.formatFilePath(filePath), value);
    // 将 JSON 字符串写入文件
    try {
      await writeFile(filePath, valueStr);
      // 如果写入成功，返回 true
      return true;
    } catch (error) {
      // 在写入文件时发生错误，返回 false
      return false;
    }
  }

  // 删除键值对
  async delete(key: string) {
    const unlink = util.promisify(fs.unlink);
    // 构建文件路径，key作为文件名
    const filePath = path.join(this.getDbPath(), `${key}.json`);
    console.debug('[DELETE]', this.formatFilePath(filePath));
    // 尝试删除文件
    try {
      await unlink(filePath);
      // 如果文件删除成功，返回 true
      return true;
    } catch (error) {
      // 在删除文件时发生错误，返回 false
      return false;
    }
  }
}
