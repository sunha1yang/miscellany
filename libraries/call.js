Function.prototype.mycall = function (thisArg) {
  // this指向调用call的对象
  if (typeof this !== 'function') {
    // 调用call的若不是函数则报错
    throw new TypeError('Error');
  }
  // 声明一个 Symbol 属性，防止 fn 被占用
  const fn = Symbol('fn');
  const args = [...arguments].slice(1);
  thisArg = thisArg || window;
  // 将调用call函数的对象添加到thisArg的属性中
  thisArg[fn] = this;
  // 执行该属性
  const result = thisArg[fn](...args);
  // 删除该属性
  delete thisArg[fn];
  // 返回函数执行结果
  return result;
};
