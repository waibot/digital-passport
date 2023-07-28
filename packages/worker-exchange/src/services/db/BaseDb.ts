export default abstract class BaseDb {
  abstract setConfig(config: any): BaseDb;

  abstract getConnection(): any;

  abstract query(sql: string, args?: any[]): Promise<any>;

  abstract execute(sql: string, args?: any[]): Promise<any>;
}
