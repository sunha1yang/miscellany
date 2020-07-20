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

function B(opt) {
  this.name = opt.name;
}

function A() {}

Object.setPrototypeOf(A, B);

// __extends(A, B);
const _a = new A({ name: '22222' });
console.log(_a);


class Polygon {
  constructor(height, width) {
    this.name = 'Rectangle';
    this.test = 'test';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
  get area() {
    return this.height * this.width;
  }
  set area(value) {
    this._area = value;
  }

  static fn () {
    console.log(2222);
  }
}

class Square extends Polygon {
  constructor(length) {
    // this.height; // ReferenceError，super 需要先被调用！

    // 这里，它调用父类的构造函数的, 
    // 作为Polygon 的 height, width
    super(length, length);

    // 注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
    // 忽略这, 这将导致引用错误。
    this.name = 'Square';
  }
}

// __extends(Square, Polygon);

const _s = new Square(1111);
console.log(_s.name, _s.test, _s.height, _s.width, Square.fn);