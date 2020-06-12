Function.prototype.mybind = function (thisArg) {
  if (typeof this !== 'function') throw TypeError('Bind must be called on a function');

  // 拿到参数，为了传给调用者
  const args = Array.prototype.slice.call(arguments, 1),
    // 保存 this
    self = this,
    // 构建一个干净的函数，用于保存原函数的原型
    nop = function () { },
    // 绑定的函数
    bound = function () {
      // this instanceof nop, 判断是否使用 new 来调用 bound
      // 如果是 new 来调用的话，this的指向就是其实例，
      // 如果不是 new 调用的话，就改变 this 指向到指定的对象 o
      return self.apply(
        this instanceof nop ? this : thisArg,
        args.concat(Array.prototype.slice.call(arguments))
      );
    };

  // 箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
  if (this.prototype) {
    nop.prototype = this.prototype;
  }

  // 修改绑定函数的原型指向
  bound.prototype = new nop();

  return bound;
};

// 思路详解：
// 1. 调用bind的方法必须是function
// 2. 参数的处理：第一个参数必须是 this的指向，其余参数随意
// 3. this的保存：在使用的过程中应该注意this的指向问题，提前保存，防止被篡改
// 4. 返回值肯定是一个函数，然后内部被apply 更改this指向（且存在两种情况：1. 构造函数 --> 指向实例。 2. 正常的this指向）
// 5. 箭头函数没有
