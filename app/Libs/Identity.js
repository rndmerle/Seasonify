/* @flow */
import uuid from 'uuid';

export default class Identity {
  static lastId: string = 'xxx';
  static forcedIds: Array<string> = [];

  static newid(): string {
    if (this.forcedIds.length > 0) {
      this.lastId = this.forcedIds.shift();
    } else {
      this.lastId = uuid();
    }
    return this.lastId;
  }

  static id(): string {
    return this.lastId;
  }

  static forceId(ids: string | Array<string>): string | Array<string> {
    if (!Array.isArray(ids)) {
      this.forcedIds = [ids];
      return ids;
    }
    this.forcedIds = ids;
    return ids[0];
  }
}
