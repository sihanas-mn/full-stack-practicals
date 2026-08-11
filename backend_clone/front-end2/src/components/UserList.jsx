import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // READ
  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // DELETE
  const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);

    loadUsers();
  };

  // PUT / UPDATE
  const updateUser = async (e) => {
    e.preventDefault();

    await api.put(`/users/${editUser._id}`, {
      name,
      email,
    });

    setEditUser(null);
    setName("");
    setEmail("");

    loadUsers();
  };

  // Load data into edit form
  const startEdit = (user) => {
    setEditUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <div>
      <h2 className="font-bold text-xl">Users</h2>

      {/* Update Form */}
      {editUser && (
        <form className="space-x-2" onSubmit={updateUser}>
          <input
            className="p-2 outline-red-400 outline-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="p-2 outline-red-400 outline-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="border-2 rounded-md p-2 border-red-400">
            Update
          </button>
        </form>
      )}

      {/* Users List */}
      {users.map((user) => (
        <div
          className="flex justify-center flex-col space-y-2 textxl"
          key={user._id}
        >
          <div>
            <h3 className="font-semibold">Name: {user.name}</h3>
            <p className="font-semibold">Email: {user.email}</p>
            <p className="font-semibold">Age: {user.age}</p>
          </div>

          <button
            className="border-2 rounded-md p-1 border-orange-400"
            onClick={() => startEdit(user)}
          >
            Edit
          </button>

          <button
            className="border-2 rounded-md p-1 border-red-400"
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
