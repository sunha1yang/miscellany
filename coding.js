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
  [-2, 1], // -2, -2, 1
  [-3, -1], // 4, -3, -1
  // [1, -1, -5, -3, -1],
  // [-2, 1, -2, -3, -1],
  // [-3, -1, 4, 1, -1],
];

const add = arr => {
  if (arr.length === 1) return arr[0];
  const maxVal = arr.reduce((prevResult, item) => {
    return prevResult += item;
  });
  return maxVal;
};

const solve = map => {
  let xindex = 0,
    yindex = 0,
    xmax = map.length > 0 && map[0].length || 0,
    ymax = map.length > 0 && map.length || 0,
    result = [],
    maxValArr = [],
    startVal,
    maxVal;
    
  console.log(map, add(map[0]));
  if (map.length === 1) return add(map[0]);
  map.reduce((prev, cur, index) => {
    let result = [];
    if (index === 1) {
      startVal = cur[0];
      result.push(startVal);
    }

    let len = index - 1;
    for (let i = 0; i < len; index++) {
      result.push(cur[i] + 1);
    }
    if (ymax === index) {
      result.forEach((item,ind) => {
        if (ind === result.length) return;
        let newArr = [item, ...cur.slice(ind)];
        maxVal = add(newArr);
        maxValArr.push(maxVal);
      });
    }
    console.log(prev);
    return prev;
  });
};
console.log(solve(map));
module.exports = solve;