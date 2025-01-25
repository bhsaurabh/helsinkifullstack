const Hello = (props) => {
  console.log("<Hello>");
  return (
    <div id="hello">
      <p>Hello { props.name1 } and { props.name2 }.</p>
      <p>Together you are the { props.collection }.</p>
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
        <Hello name1="Saurabh" name2="Lucy" collection="poepies" />
        <p>Greetings It is now { now.toString() }</p>
        <p>a is { a }, b is { b } and their sum is { a+b }</p>
      </div>
    );
}


export default App