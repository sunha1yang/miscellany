// 实现继承，通过继承父类 prototype
function __extends(child, parent) {
  // 修改对象原型
  Object.setPrototypeOf(child, parent);
  // 寄生继承，创建一个干净的构造函数，用于继承父类的 prototype
  // 这样做的好处是，修改子类的 prototype 不会影响父类的 prototype
  function __() {
    // 修正 constructor 指向子类
    this.constructor = child;
  }
  // 原型继承，继承父类原型属性，但是无法向父类构造函数传参
  child.prototype =
    parent === null
      ? Object.create(parent)
      : ((__.prototype = parent.prototype), new __());
}

var B = (function () {
  function B(opt) {
    this.name = opt.name;
  }
  return B;
})();

var A = (function (_super) {
  __extends(A, _super);
  function A() {
    // 借用继承，可以实现向父类传参, 使用 super 可以向父类传参
    return (_super !== null && _super.apply(this, { name: 'B' })) || this;
  }
  return A;
})(B);
