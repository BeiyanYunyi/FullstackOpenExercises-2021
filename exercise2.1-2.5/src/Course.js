import React from "react";

const Header = (props) => {
  return <h2>{props.course}</h2>;
};

const Content = (parts) => {
  return (
    <>
      {parts.parts.map((parts) => {
        return (
          <Part key={parts.id} part={parts.name} exercise={parts.exercises} />
        );
      })}
    </>
  );
};

const Part = (p) => {
  return (
    <p>
      {p.part} {p.exercise}
    </p>
  );
};

const Total = (p) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return (
    <p>
      Number of exercises{" "}
      {p.parts.map((parts) => parts.exercises).reduce(reducer)}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};
export default Course;
