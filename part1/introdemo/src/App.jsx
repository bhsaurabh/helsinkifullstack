import { useState } from 'react'


const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  );
}


const Button = ({onClick, text}) => {
  return(
    <button onClick={ onClick }>{text}</button>
  );
}


const History = (props) => {
  if (props.allClicks.length == 0) {
    return (
      <div>the app is used by pressing the buttons</div>
    )
  } else {
    return (
        <div>
          <p>Displaying all clicks:</p>
          <p>{ props.allClicks.join(', ') }</p>
        </div>
        )
  }
}



const App = () => {
  // useState creates the state, and returns current state and method to change state
  // method to adapt state will re-render the component since state is changed.
  const [counter, setCounter] = useState(0);  // 0 is the default value of state passed to be assigned.
  const [clicks, setClicks] = useState( { left: 0, right: 0} );  // a more complex initial state
  const [allClicks, setAll] = useState([]);  // keep track of all the clicks that have happened
  const [total, setTotal] = useState(0);  // keep track of total number of button presses

  // function that returns a function to assign to event handler
  // this defines a generic ability that can be parametrized
  const hello = (who) => () => console.log("Hello! Counter is:", who);


  const handleLeftClick = () => {
    console.log("Left before:", clicks.left);
    setClicks({ ...clicks, left: clicks.left+1 });
    console.log("Left after:", clicks.left);
    setAll([...allClicks, "L"]);  // could also use allClicks.concat('L')
    setTotal(total+1);
  };
  const handleRightClick = () => {
    console.log("Right before:", clicks.right);
    setClicks({ ...clicks, right: clicks.right+1 });
    console.log("Right after:", clicks.right);
    setAll([...allClicks, "R"]);  // could also use allClicks.concat('R')
    setTotal(total+1);
  };

  const setToValue = (newValue) => () => setCounter(newValue);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={setToValue(counter+1)} text="plus" />
      <Button onClick={setToValue(1000)} text="thousand" />
      <Button onClick={setToValue(0)} text="zero" />
      <Button onClick={setToValue(counter-1)} text="minus" />
      <br />
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      <Display counter={clicks.left} />
      <Display counter={clicks.right} />
      <History allClicks={allClicks} />
      <p>Total number of clicks: {total}</p>
      <Button onClick={hello(counter)} text="Console logger" />
    </div>
  );

}


export default App