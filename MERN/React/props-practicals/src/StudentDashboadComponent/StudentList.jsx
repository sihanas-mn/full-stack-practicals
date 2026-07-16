import React from "react";

function StudentList({ nameList }) {
  return (
    <>
      <p>Student Name List</p>
      <ul>
        { nameList.forEach((element) => (
            console.log(element)
        //   `<li>${element}</li>`
          
        )) }
      </ul>
    </>
  );
}

export default StudentList;
