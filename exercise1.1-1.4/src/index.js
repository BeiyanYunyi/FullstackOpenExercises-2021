import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (parts) => {
  console.log(parts.parts[0].name)
  return (
    <>
      <Part part={parts.parts[0].name} exercise={parts.parts[0].exercises} />
      <Part part={parts.parts[1].name} exercise={parts.parts[1].exercises} />
      <Part part={parts.parts[2].name} exercise={parts.parts[2].exercises} />
    </>
  )
}

const Part = (p) => {
  return (
    <p>
      {p.part}{p.exercise}
    </p>
  )
}

const Total = (p) => {
  return(
    <p>
      Number of exercises {p.p[0].exercises + p.p[1].exercises + p.p[2].exercises}
    </p>
  )
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
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total p={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))