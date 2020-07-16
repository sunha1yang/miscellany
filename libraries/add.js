const sum = (num) => {
  const n = num;
  return (m = 0) => {
    _m = m + n;
    return m ? sum(_m) : _m;
  };
};

console.log(sum(1)(2)(3)());