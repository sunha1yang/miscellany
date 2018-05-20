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
    [-2, 1, -2, -2, 1, -2, -2, 1, -2],
    // [-3, -1, 4, -3, -1, 4, -3, -1, 4],
    // [1, -1, -5, -3, -1, 4, -3, -1, 4],
    // [-2, 1, -2, -3, -1, 4, -3, -1, 4],
    // [-3, -1, 4, 1, -1, -5, 1, -1, -5],
    // [1, -1, -5, 1, -1, -5, 1, -1, -5],
    // [-2, 1, -2, -2, 1, -2, -2, 1, -2],
    // [-3, -1, 4, -2, 1, -2, -2, 1, -2],
    // [1, -1, -5, -2, 1, -2, -2, 1, -2],
];

function solve(map) {
    let xindex = 0,
        yindex = 0,
        xmax   = map.length > 0 && map[0].length || 0;
        ymax   = map.length > 0 && map.length || 0,
        result = [];
    let maxVal;
    
    map.reduce(function (prev, cur, index, array) {
        console.log(prev, cur, index, array);
        if (index === 1) maxVal = cur[0];
        if (index === ymax) {
            
        }
        return prev;
        console.log(maxVal);
    });
};
solve(map);
module.exports = solve;