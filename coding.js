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

  return flag === true ? 'game over' : maxVal;
};


const push = (arr, valArr) => {
  valArr && valArr.forEach((item, index) => {
    if (index === 0) {
      arr.push(item);
      return true;
    }

    arr.push(arr[index - 1] + item);
  });
  console.log(arr);
  console.log('----------- push -----------------');
  return arr;
};

const summing = (preArr, nextArr) => {
  let newArr = [];
  let newVal;
  console.log(preArr, nextArr);
  preArr.forEach((item, index) => {
    let curVal = item + nextArr[index];
    newVal = item <= 0 ? 0 : (curVal > 0 ? curVal : 0);
    newArr.push(newVal);
  });
  console.log(newArr);
  console.log('------ summing -------');
  return newArr;
};

const solve = map => {
  let xindex = 0,
    yindex = 0,
    xmax = map.length > 0 && map[0].length || 0,
    ymax = map.length > 0 && map.length || 0,
    result = [],
    maxValArr = [],
    maxVal;

  if (map.length === 1) return add(map[0]);
  map.reduce((prev, cur, ind) => {
    let summingArr = [];
    let curArr = [...cur];
    if (result.length === 0) {
      result = push(result, prev);
      curArr[0] = result[0];
      summingArr = summing(result, cur);
    } else {
      curArr[0] = prev[0];
      summingArr = summing(prev, cur);
    }
    let preVal; // [ 0, 2, 5 ]
    summingArr && summingArr.forEach((item, i) => {
      if (i > 0) {
        preVal = summingArr[i - 1];
        let val = item + preVal;
        console.log(item, summingArr[i - 1]);
        
        summingArr[i] = item === 0 ? 0 : (item > val ? item : val);
      }
    });
    maxValArr = summingArr;
    console.log('----------  result -------------');
    console.log(maxValArr);
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