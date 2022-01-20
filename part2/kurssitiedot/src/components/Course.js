import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
  
    return (<h2>{course.name}</h2>)
  
  }
  
  const Content = ({ parts }) => {
  
    return (
      <div>
        <ul>
          {parts.map(part =>
            <Part key={part.id} part={part} />
          )}
        </ul>
        <Total parts={parts} />
  
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }
  
  const Total = ({ parts }) => {
    console.log(parts)
  
    const total =
      parts.reduce((s, p) => console.log('what is happening', s, p) || s + p.exercises,0)
  
    return (
      <strong><p>total of exercises {total} </p></strong>
    )
  }

  export default Course