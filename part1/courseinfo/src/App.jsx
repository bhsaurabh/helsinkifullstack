const Header = (props) => {
  /* Render the name of the course */
  return (
      <h1>{props.course}</h1>
  );
}


const Part = (props) => {
  /* Renders the individual parts */
  return (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
  );
}


const Content = (props) => {
  /* Render the parts and number of exercises in the course */
  let toRender = props.parts.map((part, idx) => <Part part={part} key={idx} />)
  return (
    <>
      { toRender }
    </>
  );  
}


const Total = (props) => {
  /* Render the total number of exercises in the course */
  let sum = 0;
  props.parts.forEach(part => {
    sum += part.exercises;
  });
  return (
    <p>Number of exercises {sum}</p>
  );
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App