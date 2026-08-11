import { useState } from "react";
import api from "../services/api";

export default function UserForm({ refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await api.post("/users", {
      name,
      email,
      age,
    });

    setName("");
    setEmail("");
    setAge("")

    refresh();
  };

  return (
    <form onSubmit={submit} className="space-y-2 flex justify-center flex-col">
      <input className="p-2 outline-blue-400 outline-2 rounded-md"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input className="p-2 outline-blue-400 outline-2 rounded-md"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className="p-2 outline-blue-400 outline-2 rounded-md"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="border-2 border-green-400 rounded-md p-1">Add User</button>
    </form>
  );
}


