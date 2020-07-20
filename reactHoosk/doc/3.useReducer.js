import React from 'react';
import ReactDOM from 'react-dom';
//老状态,动作
function reducer(state,action){
  if(action.type === 'add'){
    return state+1;
  }else{
    return state;
  }
}
let lastState;
function useReducer(reducer,initialState){
  lastState= lastState||initialState;
  function dispatch(action){
    lastState= reducer(lastState,action);
    render();
  }
  return [lastState,dispatch];
}
//useReducer
//{type:'add'}就是action是一个普通对象
function Counter(){
  let [state,dispatch] = useReducer(reducer,0);
  return (
    <div>
      <p>{state}</p>
      <button onClick={()=>dispatch({type:'add'})}>+</button>
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