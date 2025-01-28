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



const App = () => {
  // useState creates the state, and returns current state and method to change state
  // method to adapt state will re-render the component since state is changed.
  const [counter, setCounter] = useState(0);  // 0 is the default value of state passed to be assigned.
  const [clicks, setClicks] = useState( { left: 0, right: 0} );  // a more complex initial state
  const [allClicks, setAll] = useState([]);  // keep track of all the clicks that have happened

  const increaseByOne = () => setCounter(counter+1);

  const decreaseByOne = () => setCounter(counter-1);

  const handleLeftClick = () => {
    setClicks({ ...clicks, left: clicks.left+1 })
    setAll([...allClicks, "L"]);  // could also use allClicks.concat('L')
    console.log(allClicks);
  };
  const handleRightClick = () => {
    setClicks({ ...clicks, right: clicks.right+1 })
    setAll([...allClicks, "R"]);  // could also use allClicks.concat('R')
    console.log(allClicks);
  };

  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
      <br />
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      <Display counter={clicks.left} />
      <Display counter={clicks.right} />
      Displaying all clicks:
      <p>{ allClicks.join(', ') }</p>
    </div>
  );

}


export default App