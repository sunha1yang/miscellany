function myNew() {
  // 创建一个实例对象
  var obj = new Object();
  // 取得外部传入的构造器
  var Constructor = Array.prototype.shift.call(arguments);
  // 实现继承，实例可以访问构造器的属性
  obj.__proto__ = Constructor.prototype;
  // 调用构造器，并改变其 this 指向到实例
  var ret = Constructor.apply(obj, arguments);
  // 如果构造函数返回值是对象则返回这个对象，如果不是对象则返回新的实例对象
  return typeof ret === 'object' && ret !== null ? ret : obj;
}
