module.exports = class ClockerMock extends jest.fn(){
  constructor(store) {
    this._store = store;
  }
} 