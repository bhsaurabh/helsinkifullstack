import { useState } from 'react'

const Header = ({name}) => {
  /* Render the name of the course */
  return (
      <h2>{name}</h2>
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
  /* Render the total number of exercises in the course
  Use the reduce method to sum the exercises, sum is the accumulator, part is the current element
  */
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p><i>Number of exercises {total}</i></p>
  );
}


const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
  ];

  const coursesElements = courses.map((course) => <Course course={course} key={course.id} />);

  return (
    <div>
      <h1>Web development curriculum</h1>
      {coursesElements}
    </div>
  )
}

export default App