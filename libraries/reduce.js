Array.prototype.myreduce = function reduce(callbackfn) {
  // 拿到数组
  const O = this,
    len = O.length;
  // 下标值
  let k = 0,
    // 累加器
    accumulator = undefined,
    // k下标对应的值是否存在
    kPresent = false,
    // 初始值
    initialValue = arguments.length > 1 ? arguments[1] : undefined;

  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function');
  }

  // 数组为空，并且有初始值，报错
  if (len === 0 && arguments.length < 2) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  // 如果初始值存在
  if (arguments.length > 1) {
    // 设置累加器为初始值
    accumulator = initialValue;
    // 初始值不存在
  } else {
    accumulator = O[k];
    ++k;
  }

  while (k < len) {
    // 判断是否为 empty [,,,]
    kPresent = O.hasOwnProperty(k);

    if (kPresent) {
      const kValue = O[k];
      // 调用 callbackfn
      accumulator = callbackfn.apply(undefined, [accumulator, kValue, k, O]);
    }
    ++k;
  }

  return accumulator;
};
