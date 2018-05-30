class Vue {
  constructor(options = {}) {
    this.$options = options;
    let data = this._data = this.$options;
    observe(data);
  }
}

class Observe {
  constructor(data) {
    for (let key in data) {
      Object.defineProperty(data, key, {
        get() {},
        set() {}
      });
    }
  }
}

const observe = (data) => {
  new Observe(data);
};