// const add = (num) => {
//   const n = num;
//   return (m = 0) => {
//     if (!m) return n + m;
//     return add(n + m);
//   };
// };

// console.log(add(1)(2)());


// const deepCopy = (target) => {
//   if (!target || typeof target !== 'object') {
//     return target;
//   }

//   const newTarget = Array.isArray(target) ? [] : {};

//   for (let key in target) {
//     if (typeof target[key] === 'object') {
//       newTarget[key] = deepCopy(target[key]);
//     } else {
//       newTarget[key] = target[key];
//     }
//   }

//   return newTarget;
// };

// const t = { a: { b: 2 } };
// console.log(deepCopy(t));

const __extend = (child, parent) => {
  // 修改对象原型
  Object.setPrototypeOf(child, parent);

};

// function myNew () {
//   const newObj = new Object();
//   const Fn = [].shift.call(arguments);
//   newObj.__proto__ = Fn.prototype;
//   const ret = Fn.apply(newObj, arguments);

//   return typeof ret === 'object' && ret !== null ? ret : newObj;
// }

// const _instance_of = (L, R) => {
//   let _l = L.__proto__;
//   const _r = R.prototype;
//   while (_l) {
//     if (_l === _r) {
//       return true;
//     } else {
//       _l = _l.__proto__;
//       console.log(_l);
//     }
//   }

//   return false;
// };

// console.log(_instance_of([], String));


// function myBind (context, ...rest) {
  
// }

// Function.prototype.bind = function myBind(context, ...rest) {
//   const self = this;
//   if (typeof self !== 'function') return new TypeError('bind need call by functiong!');

//   const noop = function () {};

//   const newFun = function (...arg) {
//     self.apply(this instanceof newFun ? self : context, [...rest, ...arg]);
//   };

//   noop.prototype = this.prototype;

//   newFun.prototype = new noop();

//   return newFun;
// };

// function test (...res) {
//   console.log(this, ...res);
// }

// const obj = {
//   a: 1
// };
// test.bind(obj, 2222)(1, 3, 3,4);

// const once = (fn, type) => {
//   const wrapper = () => {
//     f.apply(this);
//     this.off(wrapper, type);
//   };

//   this.once(fn. type);
// };

// function co (middlewares = []) {
//   if (!middlewares.length) return;
//   for (let mid of middlewares) {
//     if (typeof mid !== 'function') return new TypeError('参数错误');
//   }

//   return function(context, next) {
//     let index = -1;
//     const dispatch = (i) => {
//       if (i <= index) return new TypeError('next 被调用多次');
//       let fn = middlewares[i];
//       if (!fn) return Promise.resolve();
//       return Promise.resolve(fn(context, fn.bind(null, n + 1)));
//     };

//     dispatch(0);
//   };
// }

// const co = (middles) => {
//   if (!Array.isArray(middles)) return;
//   for (const mid of middles) {
//     if (typeof mid !== 'function') return;
//   }

//   return function (context, next) {
//     let index = -1;
//     const dispatch = (i) => {
//       if (i <= index) return;
//       let fn = middles[i];
//       if (i === middles.lenght) fn = next;
//       if (!fn) return Promise.resolve();

//       return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
//     };

//     dispatch(0);
//   };
// };

function myBind (context, ...res) {
  const self = this;
  const noop = function () {};
  const newFn = function (...arg) {
    self.apply(this instanceof noop ? this : context, [...res, ...arg]);
  };

  if (this.prototype) {
    noop.prototype = this.prototype;
  }

  newFn.prototype = new noop();

  return newFn;
}
