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

var multiply = function (num1, num2) {
  if (num1 == 0 || num2 == 0) return "0"
  const res = [];// 结果集
  for (let i = 0; i < num1.length; i++) {
    let tmp1 = num1[num1.length - 1 - i]; // num1尾元素
    for (let j = 0; j < num2.length; j++) {
      let tmp2 = num2[num2.length - 1 - j]; // num2尾元素
      let pos = res[i + j] ? res[i + j] + tmp1 * tmp2 : tmp1 * tmp2;// 目标值 ==》三元表达式，判断结果集索引位置是否有值
      res[i + j] = pos % 10; // 赋值给当前索引位置
      // 目标值是否大于10 ==》是否进位 这样简化res去除不必要的"0"
      pos >= 10 && (res[i + j + 1] = res[i + j + 1] ? res[i + j + 1] + Math.floor(pos / 10) : Math.floor(pos / 10));
    }
  }
  return res.reverse().join("");
};


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


const res = (arr) => {
  let ans = arr[0];
  let sum = 0;
  for (let s of arr) {
    if (sum > 0) {
      sum += s
    } else {
      sum = s;
    }

    ans = Math.max(ans, sum);
  }

  return ans;
}

// 最长公共前缀字符串：
// 字符串的长度为0或者数组为0的时候 直接返回
// 获取当前数组的第一个字符串
// 遍历数组后面的字符串
// 然后在此基础上循环第一个字符串，然后找到和其匹配的字符串并截取出来
// 然后第二次的时候，比对截取出来的字符串和第二个相对比，然后再截取
// 返回结果即可

var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return '';
  if (strs.length === 1) return strs[0];
  let ans = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    for (; j < strs[i].length && j < ans.length; j++) {
      if (ans[j] != strs[i][j]) {
        break
      }
    }
    ans = ans.substring(0, j);
  }

  return ans;
};



// ------------ 数组与排序 --------------
// 最长连续递增序列
var findLengthOfLCIS = function (nums) {
  if (!nums.length) return 0;
  const res = [];
  let count = 1;
  nums.forEach((val, i) => {
    if (i + 1 < nums.length && nums[i + 1] > val) {
      count++;
    } else {
      res.push(count);
      count = 1;
    };
  });

  return Math.max(...res);
};


// 三数之和
// 1. 先排序
// 2. 循环数组
// 3. 找到左右两侧的值
// 4. 左右两侧的值和当前值做和
// 5. 如果小于0则说明左侧的值过大，左侧右移，大于0则，右侧左移
// 6. 如果等于0，则添加至结果集里，同时左右移动一
// 7. 注意去重的判断
var threeSum = function (nums) {
  let res = [];
  if (nums == null || nums.length < 3) return res;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let L = i + 1;
    let R = nums.length - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        res.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      }
      else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return res;
};

// 最大岛屿
// 遍历grid得到每个位置岛屿🏝面积的最大值，返回一个max
// 搜索函数 - 递归实现
// 判断边界，若不在边界内，返回0岛屿🏝; 否则为1，递归计算上下左右是否为1，cnt计数岛屿🏝面积
// 判断完每个位置需要将其置0(grid[i][j] = 0)
var maxAreaOfIsland = function (grid) {
  let x = grid.length, y = grid[0].length
  let max = 0
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] == 1) {
        max = Math.max(max, cntArea(grid, i, j, x, y))
      }
    }
  }
  return max

};
let cntArea = (grid, i, j, x, y) => {
  if (i < 0 || i >= x || j < 0 || j >= y || grid[i][j] == 0) return 0
  let cnt = 1
  grid[i][j] = 0
  cnt += cntArea(grid, i + 1, j, x, y)
  cnt += cntArea(grid, i - 1, j, x, y)
  cnt += cntArea(grid, i, j + 1, x, y)
  cnt += cntArea(grid, i, j - 1, x, y)
  return cnt
}

// 搜索旋转排序数组
/*
 * @lc app=leetcode id=33 lang=javascript
 *
 * [33] Search in Rotated Sorted Array
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = start + ((end - start) >> 1);
    if (nums[mid] === target) return mid;

    // [start, mid]有序

    // ️⚠️注意这里的等号
    if (nums[mid] >= nums[start]) {
      //target 在 [start, mid] 之间

      // 其实target不可能等于nums[mid]， 但是为了对称，我还是加上了等号
      if (target >= nums[start] && target <= nums[mid]) {
        end = mid - 1;
      } else {
        //target 不在 [start, mid] 之间
        start = mid + 1;
      }
    } else {
      // [mid, end]有序

      // target 在 [mid, end] 之间
      if (target >= nums[mid] && target <= nums[end]) {
        start = mid + 1;
      } else {
        // target 不在 [mid, end] 之间
        end = mid - 1;
      }
    }
  }

  return -1;
};

// 数组中的第K个最大元素
// 排序 + 取值即可


// 合并区间
// 当后一项的左边界 <= 前一项的右边界 即说明有相交
// 【例如 1~3 2~4 其中2 < 3所以可以合并】
// 合并方法 只需将后一项的右边界变成前一项的右边界即可
// 【延续上一个例子 只需将前一项的1~3的3变成后一项的4 即1~4】

var merge = function (intervals) {
  if (intervals.length == 0)
    return []
  var res = []
  intervals.sort(function (a, b) {
    return a[0] - b[0]
  })
  res.push(intervals[0])
  for (var i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > res[res.length - 1][1])
      res.push(intervals[i])
    else
      if (intervals[i][1] > res[res.length - 1][1])
        res[res.length - 1][1] = intervals[i][1]
  }
  return res
};


// ------------ 动态与贪心 --------------
// 买股票的最佳时机
var maxProfit = function (prices) {
  let min = prices[0];
  let res = 0;
  prices.forEach((val, i) => {
    if (i === 0) return;
    if (min > val) min = val;
    if (val - min > res) res = val - min;
  });

  return res;
};


var maxProfit = function (prices) {
  let res = 0;
  prices.forEach((val, i) => {
    if (i > 0) {
      res += Math.max(0, val - prices[i - 1]);
    }
  })

  return res;
};

// 最大子续和
var maxSubArray = function (nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
    pre = Math.max(pre + x, x);
    maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};


// x 的平方根
// 二分法查找
// 通过查找不断逼近正确值
var mySqrt = function (x) {
  if (x === 0 || x === 1) return x
  let low = 0
  let high = x
  let mid
  let qr
  while (low < high) {
    mid = Math.floor(low + (high - low) / 2)
    qr = mid * mid
    if (qr === x) return mid
    if (qr < x && (mid + 1) * (mid + 1) > x) return mid // 这里要判断mid下一位的平方是否会比给定的阿平方数大
    if (qr > x) {
      high = mid - 1
    } else {
      low = mid + 1
    }

  }
  return low // 最后返回low必然没错，因为是舍弃小数点往小取整数
};