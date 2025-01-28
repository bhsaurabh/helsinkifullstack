const Header = ({course}) => {
  /* Render the name of the course */
  return (
      <h1>{course}</h1>
  );
}


const Part = ({ part }) => {
  /* Renders the individual parts */
  return (
    <p>
        {part.name} {part.exercises}
    </p>
  );
}


const Content = ({parts}) => {
  /* Render the parts and number of exercises in the course */
  let toRender = parts.map((part, idx) => <Part part={part} key={idx} />)
  return (
    <>
      { toRender }
    </>
  );  
}


const Total = ({parts}) => {
  /* Render the total number of exercises in the course */
  let sum = 0;
  parts.forEach(part => {
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