const Hello = ({ name, age }) => {
  console.log("<Hello>");

  const birthYear = () => new Date().getFullYear() - age

  return (
    <div id="hello">
      <p>Hello { name }. You are {age} years old.</p>
      <p>You were probably born in {birthYear()}.</p>
    </div>
  );
}



const App = () => {
  const now = new Date();
  const a = 5;
  const b = 10;
  console.log("<App>")
  return (
      <div>
        <Hello name="Saurabh" age={32} />
        <p>Greetings It is now { now.toString() }</p>
        <p>a is { a }, b is { b } and their sum is { a+b }</p>
      </div>
    );
}


export default App