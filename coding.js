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

function solve(map) {
  if (map === null) return 0;

  const h = map.length;
  if (h === 0) return 0;
  const w = map[0].length;
  if (w === 0) return 0;

  // 动态规划
  const dp = new Array(h);
  for (let i = 0; i < h; ++i) {
    dp[i] = new Array(w).fill(0);
  }

  dp[h - 1][w - 1] = map[h - 1][w - 1] > 0 ? 0 : -map[h - 1][w - 1];

  // 初始化尾行
  for (let i = w - 2; i >= 0; --i) {
    dp[h - 1][i] = Math.max(dp[h - 1][i + 1] - map[h - 1][i], 0);
  }

  // 初始化尾列
  for (let i = h - 2; i >= 0; --i) {
    dp[i][w - 1] = Math.max(dp[i + 1][w - 1] - map[i][w - 1], 0);
  }

  for (let i = h - 2; i >= 0; --i) {
    for (let j = w - 2; j >= 0; --j) {
      dp[i][j] = Math.max(Math.min(dp[i][j + 1], dp[i + 1][j]) - map[i][j], 0);
    }
  }

  return dp[0][0] + 1;
}

function calc(path) {
  return path.reduce((acc, cur) => Math.max(acc - cur, 0), 0) + 1;
}

function solve2(map) {
  const h = map.length;
  if (h === 0) return 0;
  const w = map[0].length;
  if (w === 0) return 0;

  let min = Number.MAX_SAFE_INTEGER;

  function dfs(x, y, path) {
    if (x === 0 && y === 0) {
      return min = Math.min(min, calc(path.slice()));
    }

    if (x - 1 >= 0) {
      path.push(map[x - 1][y]);
      dfs(x - 1, y, path);
      path.pop();
    }

    if (y - 1 >= 0) {
      path.push(map[x][y - 1]);
      dfs(x, y - 1, path);
      path.pop();
    }
  }

  dfs(h - 1, w - 1, [map[h - 1][w - 1]]);

  return min;
}

module.exports = { solve, solve2 };
