class Event {
  constructor() {
    // 会把所有的事件监听函数放在这个对象里保存
    this.events = {};
    // 指定给一个事件类型增加的监听函数数量最多有多少个
    this._maxListeners = 10;
  }

  setMaxListeners(maxListeners) {
    this._maxListeners = maxListeners;
  }

  /**
   * 绑定当前类型的事件操作
   * @param {string} type 
   * @param {function} listener 
   */
  on(type, listener) {
    if (!this.events[type]) return this.events[type] = [listener];
    this.events[type].push(listener);
    if (this._maxListeners != 0 && this.events[type].length > this._maxListeners) {
      console.warn('MaxListenersExceededWarning. Use emitter.setMaxListeners() to increase limit');
    }
  }

  /**
   * 绑定当前类型的事件操作,但是只会执行一次
   * @param {string} type 
   * @param {function} listener 
   */
  once(type, listener) {
    const wrapper = () => {
      listener.apply(this);
      this.off(type, wrapper);
    };
    this.on(type, wrapper);
  }

  /**
   * 移除绑定的type类型的listener处理事件
   * @param {string} type 
   * @param {function} listener 
   */
  off(type, listener) {
    if (!this.events[type]) return console.warn(`${type} is not found!`);
    return this.events[type] = this.events[type].filter(l => l != listener);
  }

  /**
   * 移除绑定的type类型的所有处理事件
   * @param {string} type  
   */
  offAll(type) {
    delete this.events[type];
  }

  /**
   * 执行所有绑定的type类型的处理事件
   * @param {string} type 
   * @param {*} rest 
   */
  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach(listener => listener.apply(this, rest));
  }
}

module.exports = Event;