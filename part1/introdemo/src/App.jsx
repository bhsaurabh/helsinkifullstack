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
  const [clicks, setClicks] = useState( { left: 0, right: 0} );

  const increaseByOne = () => setCounter(counter+1);

  const decreaseByOne = () => setCounter(counter-1);

  const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left+1 });
  const handleRightClick = () => setClicks({ ...clicks, right: clicks.right+1 });

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
    </div>
  );

}


export default App