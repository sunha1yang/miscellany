// js实现深度复制

const deepClone = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = (obj && typeof obj[key] === 'object') ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
};
