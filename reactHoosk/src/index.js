import React from 'react';
import ReactDOM from 'react-dom';
let lastRef ;
function useRef(initialRef){
  lastRef=lastRef||initialRef;
  return {
    current:lastRef
  }
}

let lastDependencies;
function useEffect(callback,dependencies){
  if(lastDependencies){
    //看看新的依赖数组是不是每一项都跟老的依赖数组中的每一项都相同
    let changed = !dependencies.every((item,index)=>{
      return item == lastDependencies[index];
    });
    if(changed){
      setTimeout(callback);
      lastDependencies = dependencies;
    }
  }else{//没有渲染过
    setTimeout(callback);
    lastDependencies = dependencies;
  }
}
let lastLayoutDependencies;
function useLayoutEffect(callback,dependencies){
  if(lastLayoutDependencies){
    //看看新的依赖数组是不是每一项都跟老的依赖数组中的每一项都相同
    let changed = !dependencies.every((item,index)=>{
      return item == lastLayoutDependencies[index];
    });
    if(changed){
      //Promise.resolve().then(callback);
      queueMicrotask(callback);//把callback放到微任务队列中
      lastLayoutDependencies = dependencies;
    }
  }else{//没有渲染过
    //Promise.resolve().then(callback);
    queueMicrotask(callback);//把callback放到微任务队列中
    lastLayoutDependencies = dependencies;
  }
}
function Animation(){
  //ref是一个对象,它有current属性 ref.current指向这个div的真实DOM元素
  const ref = useRef();
  //这个useEffect是在浏览器渲染完成后执行的
  useEffect(()=>{
    console.log('useLayoutEffect');
    ref.current.style.transform = `translate(500px)`;
    ref.current.style.transition = 'all 800ms';
  });
  let style = {
    width:'100px',
    height:'100px',
    backgroundColor:'red'
  }
  console.log('Animation ');
  return (
    <div style={style} ref={ref}>内容</div>
  )
}
function render(){
  ReactDOM.render(
    <Animation/>,
    document.getElementById('root')
  );
}
render();
//useEffect 三个小时