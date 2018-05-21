/**
 * @param {Array<Array<Number>>} map 输入地图数据
 * @returns {Number} 返回所需的最小生命值
 * 
 * eg:
 *   const map = [
 *     [-2, 1, -2],
 *     [-3, -1, 4],
 *     [1, -1, -5],
 *   ];
 *   console.log(solve(map)); // => 4
 */

const map = [
  [2, 1, -2],
  [-3, -1, 4],
  [1, -1, -5],
];

const add = arr => {
  if (arr.length === 1) return arr[0];
  let flag = false;
  let summingVal;
  const maxVal = arr.reduce((prevResult, item) => {
    summingVal = prevResult + item;
    if (summingVal <= 0 ) flag = true;
    return summingVal;
  });

  return flag === true ? 0 : maxVal;
};


const push = (arr, valArr) => {
  valArr && valArr.forEach((item, index) => {
    if (index === 0) {
      arr.push(item);
      return true;
    }

    arr.push(arr[index - 1] + item);
  });

  return arr;
};

const summing = (preArr, nextArr) => {
  let newArr = [];
  let newVal;

  preArr.forEach((item, index) => {
    let curVal = item + nextArr[index];
    newVal = item <= 0 ? 0 : (curVal > 0 ? curVal : 0);
    newArr.push(newVal);
  });
  return newArr;
};

const sum = (summingArr, curArr, sumValArr) => {
  let sumVal;
  console.log(summingArr, curArr);
  summingArr.forEach((item, index) => {
    // if (index === summingArr.length) return;
    let newArr = [item, ...curArr.slice(index + 1)];
    sumVal = add(newArr);
    sumValArr.push(sumVal);
  });

  return sumValArr;
};

const solve = map => {
  let result = [],
    maxValArr = [],
    maxVal;

  if (map.length === 1) return add(map[0]);
  map.reduce((prev, cur) => {
    let summingArr = [];
    let curArr;
    if (result.length === 0) {
      result = push(result, prev);
      summingArr = summing(result, cur);
    } else {
      summingArr = summing(prev, cur);
    }
    result = sum(summingArr, cur, []);
    // console.log(result, summingArr);
    summingArr && summingArr.forEach((item, i) => {
      let val = result[i];
      console.log(val);
      item < val && (summingArr[i] = val);
    });
    // maxValArr = summingArr;
    console.log('----------  result -------------');
    console.log(summingArr);
    console.log('----------  result -------------');
    return summingArr;
    // if (ymax === index) {
    //   result.forEach((item,ind) => {
    //     if (ind === result.length) return;
    //     let newArr = [item, ...cur.slice(ind)];
    //     maxVal = add(newArr);
    //     maxValArr.push(maxVal);
    //   });
    // }
  });
};

solve(map);
module.exports = solve;