import React,{useState} from 'react';
import ReactDOM from 'react-dom';
//useEffect是一个钩子,它里的函数会在组件渲染完成后执行
//副作用 side effect ajax 操作DOM 修改浏览器标题
let lastDependencies;
function useEffect(callback,dependencies){
  if(lastDependencies){
    //看看新的依赖数组是不是每一项都跟老的依赖数组中的每一项都相同
    let changed = !dependencies.every((item,index)=>{
      return item == lastDependencies[index];
    });
    if(changed){
      callback();
      lastDependencies = dependencies;
    }
  }else{//没有渲染过
    callback();
    lastDependencies = dependencies;
  }
}
let lastDependencies;
function useLayoutEffect(callback,dependencies){
  if(lastDependencies){
    //看看新的依赖数组是不是每一项都跟老的依赖数组中的每一项都相同
    let changed = !dependencies.every((item,index)=>{
      return item == lastDependencies[index];
    });
    if(changed){
      callback();
      lastDependencies = dependencies;
    }
  }else{//没有渲染过
    callback();
    lastDependencies = dependencies;
  }
}
function Counter(){
  let [name,setName] =useState('test');
  let [number,setNumber] =useState(0);
  //依赖不传,每次都会更新都会执行,如果传一个空组件,只会第一执行
  useEffect(()=>{
    console.log(number);
  },[number]);
  return (
    <div>
      <p>{name}</p>
      <p>{number}</p>
      <button onClick={()=>setName(Date.now()+'')}>修改名称</button>
      <button onClick={()=>setNumber(number+1)}>+</button>
    </div>
  )
}
function render(){
  ReactDOM.render(
    <Counter/>,
    document.getElementById('root')
  );
}
render();