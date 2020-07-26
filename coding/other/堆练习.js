// 腾讯 & 字节等：最小的k个数
// leetcode347：前 K 个高频元素
// 字节 & leetcode215：数组中的第K个最大元素
// 剑指Offer & leetcode295：数据流的中位数

// 思路： 先快排  +  取结果

const quick = (arr) => {
  if (arr.length <= 1) return arr;
  const middle = Math.floor(arr.length / 2);
  const _middleValue = arr.splice(middle, 1)[0];
  console.log(_middleValue);
  const left = [];
  const right = [];

  arr.forEach(val => {
    if (val > _middleValue) {
      right.push(val);
    } else {
      left.push(val);
    }
  });

  // const _left = quick(left);
  // const _right = quick(right);
  // console.log(_right, _left, _middleValue);
  return [...quick(left), _middleValue, ...quick(right)];
}

let arr = [1, 3, 2, 5, 4]
console.log(quick(arr));

// var quickSort = function (arr) {
//   if (arr.length <= 1) { return arr; }
//   var pivotIndex = Math.floor(arr.length / 2);
//   var pivot = arr.splice(pivotIndex, 1)[0];
//   var left = [];
//   var right = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }
//   return quickSort(left).concat([pivot], quickSort(right));
// };

// console.log(quickSort(arr));


// 最长子串：
// 1. 维护一个字符串用来保存当前的子串
// 2. 维护一个 len 来保存当前的最长子串
// 3. 每次提交的时候记得删除旧的子串并且添加新的子串
const maxLen = (str = '') => {
  let len = 0;
  let _str = '';
  for (const s of str) {
    if (_str.indexOf(s) > -1) {
      _str = _str.substr(_str.indexOf(s) + 1);
    }
    len = len > _str.length ? len : _str.length;
  }

  return len;
}

// 字符串相乘
// 1. 使用数学的方法进行计算即可
// 设置数组res = []来存储数据，2 * 4的时候，res["8"]
// 1 * 4 ==> res["8", "4"]
// 3 * 2 = 6 + 4 =10; 因为6 + 4 >= 10, 那么进一位，res["8", "0", "1"]
// 3 * 1 = 3 + 进位的1 = 4 小于10，res["8", "0", "4"]
// res取反，res.reverse() == ["4", "0", "8"]


// 翻转字符串里的单词
var reverseWords = function (s) {
  return s.trim().split(/\s+/g).reverse().join(' ');
};


// 简化路径
var simplifyPath = function (path) {
  const _path = path.split(/\/+/g);
  const res = [];
  console.log(_path);
  for (let _p of _path) {
    if (_p === '..') {
      res.pop();
    } else {
      console.log(_p);
      _p && _p !== '.' && res.push(_p);
    }
  }

  return '/' + res.join('/');
};
