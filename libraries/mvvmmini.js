// 数据
const data = {
  text: 'default'
};
const input = document.getElementById('input');
const span = document.getElementById('span');
// 数据劫持
Object.defineProperty(data, 'text', {
  // 数据变化 --> 修改视图
  set(newVal) {
    input.value = newVal;
    span.innerHTML = newVal;
  }
});
// 视图更改 --> 数据变化
input.addEventListener('keyup', function (e) {
  data.text = e.target.value;
});

// 数据
const data2 = {
  text: 'default'
};
const input2 = document.getElementById('input2');
const span2 = document.getElementById('span2');
// 数据劫持
const handler = {
  set(target, key, value) {
    target[key] = value;
    // 数据变化 --> 修改视图
    input2.value = value;
    span2.innerHTML = value;
    return value;
  }
};
const proxy = new Proxy(data2, handler);

// 视图更改 --> 数据变化
input2.addEventListener('keyup', function (e) {
  proxy.text = e.target.value;
});
