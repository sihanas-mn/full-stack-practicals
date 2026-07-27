import React from "react";
import { useState } from "react";

const FormSubmit = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)

    const getFormData = (event) => {
        event.preventDefault()
        setName(event.currentTarget.nameInput.value)
        setAge(event.currentTarget.ageInput.value)
    }
  return (
    <>
      <h1>FormSubmit</h1>
      <form onSubmit={getFormData}>
        <input id="nameInput" type="text" placeholder="name"/>
        <input id="ageInput" type="number" placeholder="age"/>
        <button type="submit">click to submit</button>
        <p>{name}</p>
        <p>{age}</p>
      </form>
    </>
  );
};

export default FormSubmit;
