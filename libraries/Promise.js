'use strict';

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolvePromise = (promise2, x, resolve, reject) => {
  // 如果promise2和x是同一个函数的话则抛出异常
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }

  // promise2是否已经resolve或reject，防止出现同时执行成功或者失败的回调
  let called = false;
  if (x instanceof Promise) {
    // 如果当前状态是PENDING，则调用then方法
    // 注意点：由于不知道最终态是什么，所以还要继续回调resolvePromise方法
    if (x.status === PENDING) return x.then((y) => {
      resolvePromise(promise2, y, resolve, reject);
    }, reject);
    // 如果状态非PENDING态，直接执行即可
    return x.then(resolve, reject);
  } else if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      let then = x.then;
      // 到此的话x不是一个thenable对象，那直接把它当成值resolve promise2就可以了
      if (typeof then !== 'function') return resolve(x);
      // 有些promise会同时执行成功和失败的回调
      then.call(x, function (y) {
        // 如果promise2已经成功或失败了，则不会再处理了
        if (called) return;
        called = true;
        resolvePromise(promise2, y, resolve, reject);
      }, function (err) {
        if (called) return;
        called = true;
        reject(err);
      });
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果x是一个普通的值，则直接resolve
    resolve(x);
  }
};

class Promise {
  constructor(executor) {

    // executor不是函数直接抛出异常
    if (typeof executor !== 'function') throw new TypeError('Promise executor is not a function');

    // 给Promise实例同步当前状态
    this.status = PENDING;
    // 初始化存放成功的回调的数组
    this.onResolvedCallbacks = [];
    // 初始化存放失败回调的数组
    this.onRejectedCallbacks = [];
    
    // 当调用此方法的时候，如果promise状态为pending的话可以转成成功态,如果已经是成功态或者失败态了，则什么都不做
    const resolve = (value) => {
      if (value != null && value.then && typeof value.then === 'function') {
        return value.then(resolve, reject);
      }

      process && process.nextTick(() => {
        // 如果是初始态，则转成成功态
        if (this.status === PENDING) {
          this.status = FULFILLED;
          // 同步成功的data给value
          this.value = value;
          // 调用所有成功的回调
          this.onResolvedCallbacks.forEach(cb => cb(this.value));
        }
      });
    };

    const reject = (reason) => {
      process && process.nextTick(() => {
        // 如果是初始态，则转成失败态
        if (this.status == PENDING) {
          this.status = REJECTED;
          // 同步失败的原因给value
          this.value = reason;
          // 调用所有失败的回调
          this.onRejectedCallbacks.forEach(cb => cb(this.value));
        }
      });
    };

    try {
      // 因为函数执行可能会异常，所以需要捕获
      executor(resolve, reject);
    } catch (e) {
      // 如果函数执行报错，则用报错的原因执行reject函数
      reject(e);
    }
  }
  // onFulfilled：成功回调  onRejected：失败的回调
  then(onFulfilled, onRejected) {
    // 如果成功和失败的回调没有传，则表示这个then没有任何逻辑，值会继续传递
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected == 'function' ? onRejected : reason => {
      throw reason;
    };
    // 如果当前promise状态已经是成功态了，onFulfilled直接取值
    let promise2;
    // FULFILLED处理逻辑
    if (this.status == FULFILLED) {
      return promise2 = new Promise((resolve, reject) => {
        process && process.nextTick(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }

    // REJECTED处理逻辑
    if (this.status == REJECTED) {
      return promise2 = new Promise((resolve, reject) => {
        process && process.nextTick(() => {
          try {
            let x = onRejected(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }

    // PENDING处理逻辑
    if (this.status == PENDING) {
      return promise2 = new Promise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }

  static gen (times, cb) {
    let result = [],
      count = 0;
    return function (i, data) {
      result[i] = data;
      if (++count == times) {
        cb(result);
      }
    };
  }

  static all (promises) {
    return new Promise((resolve, reject) => {
      let done = this.gen(promises.length, resolve);
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(function (data) {
          done(i, data);
        }, reject);
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) =>{
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    });
  }

  static resolve(value) {
    return new Promise( (resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}






Promise.deferred = Promise.defer = () => {
  let defer = {};
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};


module.exports = Promise;