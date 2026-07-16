import React from "react";
import StudentList from "./StudentDashboadComponent/StudentList";

function StudentDashboard() {
  let studentNames = ["aski", "asrif", "sam"];
  return ( <StudentList nameList={studentNames}></StudentList>) 
}

export default StudentDashboard;
