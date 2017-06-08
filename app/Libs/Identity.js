import uuid from 'uuid';

export default class Identity {
  static lastId = 0;
  static forcedIds = [];

  static newid() {
    if (this.forcedIds.length > 0) {
      this.lastId = this.forcedIds.shift();
    } else {
      this.lastId = uuid();
    }
    return this.lastId;
  }

  static id() {
    return this.lastId;
  }

  static forceId(ids) {
    if (!Array.isArray(ids)) {
      this.forcedIds = [ids];
      return ids;
    }
    this.forcedIds = ids;
    return ids[0];
  }
}
