import React, { useState } from "react";
import userList from "./db_diccionario.js";
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const results = userList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const [users, setUsers] = useState(userList);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const [editing, setEditing] = useState(false);

  const initialUser = { id: null, name: "", username: "" };

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (newUser) => {
    setUsers(
      users.map((user) => (user.id === currentUser.id ? newUser : user))
    );
    setCurrentUser(initialUser);
    setEditing(false);
  };

  return (
    <div className="container">
      <h1 className="align-center ">React Diccionario Microeconomia</h1>
      <h2 className="align-center ">Hugo Leonel Ortiz-1990 16 14324</h2>
      <div className="row">
        <input
          className="five columns"
          type="text"
          placeholder="Buscador"
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="seven columns"></div>
        {searchTerm.length > 0 ? (
          <ul>
            {searchResults.map((item) => (
              <li>{item.name + ": " + item.username}</li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
        <div className="twelve columns">
          {editing ? (
            <div>
              <h2>Edit definicion</h2>
              <EditUserForm
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Añadir definicion</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="twelve columns">
          <h2>Explorar Palabras</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editUser={editUser}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
