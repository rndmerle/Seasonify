import uuid from 'uuid';


export default class Ident {
  static lastId = 0;

  static newid() {
    this.lastId = uuid();
    return this.lastId;
  }

  static id() {
    return this.lastId;
  }

  // sameId = () => (this.lastId);
  //
  // genId = () => {
  //   this.lastId = uuid();
  //   return this.lastId;
  // }
}
