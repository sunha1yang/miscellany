import React,{useState} from 'react';
import ReactDOM from 'react-dom';
let AppContext = React.createContext();
//AppContext Provider

function useContext(context){
  return context._currentValue;
}
function Counter(){
  let {state,setState} = useContext(AppContext);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={()=>setState({number:state.number+1})}>+</button>
    </div>
  )
}
function App(){
  let [state,setState]= useState({number:0});
  return (
    <AppContext.Provider value={{state,setState}}>
        <div>
          <div>
            <Counter/>
          </div>
        </div>
    </AppContext.Provider>
  )
}
function render(){
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
}
render();