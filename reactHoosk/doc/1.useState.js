import React from 'react';
import ReactDOM from 'react-dom';
let lastState;
function useState(initialState){
  lastState=lastState||initialState;
  function setState(newState){
    lastState=newState;
    render();
  }
  return [lastState,setState];
}
function Counter(){
 let [state,setState] = useState(0);
 return (
   <>
      <p>{state}</p>
      <button onClick={()=>setState(state+1)}>+</button>
   </>
 )
}
function render(){
  ReactDOM.render(
    <Counter/>,
    document.getElementById('root')
  );
}
render();