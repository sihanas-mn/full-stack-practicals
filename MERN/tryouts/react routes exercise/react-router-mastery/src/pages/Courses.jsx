import React from "react";
import { COURSES } from "../data/courses";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {COURSES.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
