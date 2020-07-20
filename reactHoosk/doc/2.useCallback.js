import React,{memo} from 'react';
import ReactDOM from 'react-dom';
//因为组件可能会有多个state,
///不要在if 里或者 while时使用useState
let lastStates=[];
let index=0;
function useState(initialState){
  lastStates[index]=lastStates[index]||initialState;
  const currentIndex = index;
  function setState(newState){
    lastStates[currentIndex]=newState;
    render();
  }
  return [lastStates[index++],setState];
}
let lastCallback;
let lastCallbackDependencies;
function useCallback(callback,dependencies){
  if(lastCallbackDependencies){
    //看看新的依赖数组是不是每一项都跟老的依赖数组中的每一项都相同
    let changed = !dependencies.every((item,index)=>{
      return item == lastCallbackDependencies[index];
    });
    if(changed){
      lastCallback = callback;
      lastCallbackDependencies = dependencies;
    }
  }else{//没有渲染过
    lastCallback=callback;
    lastCallbackDependencies=dependencies;
  }
  return lastCallback;
}
let lastMemo;
let lastMemoDependencies;
function useMemo(callback,dependencies){
  if(lastMemoDependencies){
    //看看新的依赖数组是不是每一项都跟老的依赖数组中的每一项都相同
    let changed = !dependencies.every((item,index)=>{
      return item == lastMemoDependencies[index];
    });
    if(changed){
      lastMemo=callback();
      lastMemoDependencies=dependencies;
    }
  }else{//没有渲染过
    lastMemo=callback();
    lastMemoDependencies=dependencies;
  }
  return lastMemo;
}
function Child({data,addClick}){
  console.log('Child render');
  return <button onClick={addClick}>{data.number}</button>
}
//把函数组件传给memo方法,返回一个新组件,改造后每次渲染前会判断一下属性变了没有,如果属性不变不渲染,变了才
Child=memo(Child);
function App(){
  let [number,setNumber] = useState(0);
  let [name,setName] = useState('test');
  let addClick = useCallback(()=>setNumber(number+1),[number]);//每次也是新的
  let data = useMemo(()=>({number}),[number]);//data 每次都是新的
  return (
    <div>
      <input value={name} onChange={event=>setName(event.target.value)}/>
      <Child data={data} addClick={addClick}/>
    </div>
  )
}

function render(){
  index=0;
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
}
render();