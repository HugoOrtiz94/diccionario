import React from "react";

const UserTable = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Palabra</th>
          <th>Definicion</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map((user) => {
            const { id, name, username } = user;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{username}</td>
                <td>
                  <button onClick={() => props.deleteUser(id)}>Delete</button>
                  <button onClick={() => props.editUser(id, user)}>Edit</button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4}>No hay nada por aca! </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
