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
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6, [7]]]];
console.log(myFlat(arr3, 5));
// // [1, 2, 3, 4, 5, 6]

// //使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(myFlat(arr4, Infinity));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


// function* flatten(array, depth = 1) {
//   for (const item of array) {
//     if (Array.isArray(item) && depth > 0) {
//       yield* flatten(item, depth - 1);
//     } else {
//       yield item;
//     }
//   }
// }

// const arr = [1, 2, [3, 4, [5, 6]]];
// console.log(' ------- -----');
// const flattened = [...flatten(arr4, Infinity)];
// console.log(flattened);


const PromiseRace = (promises) => {
  return  new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      promises[index].then(resolve, reject);
    }
  });
};

const PromiseResolve = () => new Promise(resolve => resolve(value));

const PromiseReject = () => new Promise((resolve, reject) => reject(reason));

const PromiseAll = (promises) => {
  let res = [];
  return new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      promises[index].then((data) => {
        res.push(data);
        if (res.length === promises.length) {
          resolve(res);
        }
      }, reject);
    }
  });
};

PromiseAll([Promise.resolve(222), Promise.reject(333)]).then(rr => {
  console.log('Promise all');
  console.log(rr);
}).catch(err => {
  console.log(err);
})