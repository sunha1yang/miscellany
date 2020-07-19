function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
  var O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null)
      return false;
    if (O === L) // 这里重点：当 O 严格等于 L 时，返回true 
      return true;
    L = L.__proto__;
  }
}
