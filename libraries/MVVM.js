function Mvvm(options = {}) {
  // 将所有属性挂载在$options;
  this.$options = options;
  let data = this._data = this.$options.data;

  observe(data);

  for (let key in data) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    });
  }
  initComputed().call(this);
  new Compile(options.el, this);
}

function initComputed() {
  let vm = this;
  let computed = this.$options.computed;
  Object.keys(computed).forEach(key => {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set() {}
    });
  });
}

function Compile(el, vm) {
  // el 表示替换的范围
  vm.$el = document.querySelector(el);
  let fragment = document.createDocumentFragment();
  let child = null;
  while (child = vm.$el.firstChild) { // 将app中的内容 移入到内存中
    fragment.appendChild(child);
  }
  replace(fragment);

  function replace(fragment) {
    let reg = /\{\{(.*)\}\}/;
    Array.from(fragment.childNodes).forEach((node) => { // 循环每一层
      let text = node.textContent;
      if (node.nodeType === 3 && reg.test(text)) {
        let arr = RegExp.$1.split('.');
        let val = vm;
        arr.forEach((k) => {
          val = val[k];
        });

        new Watcher(vm, RegExp.$1, function (newVal) {
          node.textContent = text.replace(/\{\{(.*)\}\}/, newVal);
        });
        // 替换的逻辑
        node.textContent = text.replace(/\{\{(.*)\}\}/, val);
      }
      if (node.nodeType === 1) {
        // 元素节点
        let nodeAttrs = node.attributes;
        // console.log(nodeAttrs);
        Array.from(nodeAttrs).forEach((attr) => {
          let name = attr.name; 
          let exp = attr.value; 
          if (name.indexOf('v-') == 0) node.value = vm[exp];
          new Watcher(vm, exp, function (newVal) {
            node.value = newVal;
          });
          node.addEventListener('input', function (e) {
            let newVal = e.target.value;
            vm[exp] = newVal;
          });
        });
      }
      if (node.childNodes) replace(node);
    });
  }

  vm.$el.appendChild(fragment);
}


// 观察对象 给对象增加ObjectDefineProperty
function Observe(data) {
  let dep = new Dep();
  for (let key in data) {
    let val = data[key];
    observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target); //  [watcher]
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        observe(val);
        dep.notify(); // 让所有 watcher 的 update 方法执行
      }
    });
  }
}

function observe(data) {
  if (typeof data !== 'object') return;
  return new Observe(data);
}

// 发布订阅模式
function Dep() {
  this.subs = [];
}
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};

Dep.prototype.notify = function () {
  this.subs.forEach((sub) => {
    sub.update();
  });
};

function Watcher(vm, exp, fn) {
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;
  Dep.target = this;
  let val = vm;
  let arr = exp.split('.');
  arr.forEach((k) => {
    val = val[k];
  });
  Dep.target = null;
}

Watcher.prototype.update = function () {
  let val = this.vm;
  let arr = this.exp.split('.');
  arr.forEach((k) => {
    val = val[k];
  });
  this.fn(val);
};


module.exports = Mvvm;