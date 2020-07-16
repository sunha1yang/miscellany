const arrayToTree = (arr) => {
  const res = [];
  const map = {};
  arr.forEach((_arr, _ind) => {
    _arr.forEach((val, index) => {
      if (!map[val]) {
        map[val] = {
          name: val,
          child: [],
        };
      }

      if (index === 0) {
        res.indexOf(map[val]) === -1 && res.push(map[val]);
      } else {
        const pre = _arr[index - 1];
        if (map[pre]) {
          map[pre].child.indexOf(map[val]) === -1 && map[pre].child.push(map[val]);
        }
      }
    });
  });

  return res;
};

console.log(arrayToTree(arr));
