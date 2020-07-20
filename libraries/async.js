function spawn(genF, ...res) {
  return new Promise(function (resolve, reject) {
    const gen = genF(...res);
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function (v) {
        step(function () { return gen.next(v); });
      }, function (e) {
        step(function () { return gen.throw(e); });
      });
    }
    step(function () { return gen.next(undefined); });
  });
}


function* gen(n) {
  let a = n;
  console.log(a);
  let b = yield 1;
  console.log(b);
  let c = yield 2;
  console.log(c);
  return 'result';
};

// let g = gen(8);
spawn(gen, 2222);

// console.log(g.next(9));
// console.log(g.next(10));
// console.log(g.next(11));
// console.log(g.next(12));
// console.log(g.next(13));
// async 实现思路
// 