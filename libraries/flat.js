const myFlat = (arr, dep = 1) => {
  if (!Array.isArray(arr)) return;
  // if (dep === Infinity) return arr.toString().split(',');
  const res = [];
  let _res = [];
  if (dep === -1) return [arr];
  arr.forEach(val => {
    if (Array.isArray(val)) {
      _res = myFlat(val, dep - 1);
      res.push(..._res);
    } else {
      res.push(val);
    }
  });
  return res;
};


var arr1 = [1, 2, [3, 4]];
console.log(myFlat(arr1));
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
console.log(myFlat(arr2));
// // [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6, [7]]]];
console.log(myFlat(arr3, 5));
// // [1, 2, 3, 4, 5, 6]

// //使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(myFlat(arr4, Infinity));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]