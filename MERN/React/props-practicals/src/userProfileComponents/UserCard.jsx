import React from "react";

function UserCard(props) {
  return (
    <>
      <p>name: {props.name}</p>
      <p>age: {props.age}</p>
      <p>city: {props.city}</p>
    </>
  );
}

export default UserCard;
