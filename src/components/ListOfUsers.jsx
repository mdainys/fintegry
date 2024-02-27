import React, { useState, useEffect } from "react";

const ListOfUsers = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState({});

  const fetchUsers = () => {
    let keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      keys.push(key);
    }
    setUsers(keys);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const userData = JSON.parse(localStorage.getItem(users[index]));
    setEditingValue(userData);
  };

  const handleDelete = (index) => {
    localStorage.removeItem(users[index]);
    fetchUsers();
  };

  const handleSave = () => {
    localStorage.setItem(users[editingIndex], JSON.stringify(editingValue));
    setEditingIndex(null);
    fetchUsers();
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleChange = (event, key) => {
    setEditingValue({ ...editingValue, [key]: event.target.value });
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  return (
    <div>
      <h1>List Of Users</h1>
      {users.length === 0 ? (
        <div>Users list is empty.</div>
      ) : (
        users.map((user, index) => {
          return (
            <div key={index} className="editeList">
              {editingIndex === index ? (
                <>
                  <div className="formEdit_wrapper">
                    {user}
                    {Object.keys(editingValue).map((key, index) => (
                      <div className="form_item" key={index + 1}>
                        <div className="label">{key}:</div>
                        <input
                          type="text"
                          placeholder={key}
                          value={editingValue[key]}
                          onChange={(e) => handleChange(e, key)}
                          className="inputItem"
                        />
                      </div>
                    ))}
                  </div>
                  <button onClick={handleSave} className="button button_margin">
                    Save
                  </button>
                  <button onClick={handleCancel} className="button">
                    Cancel
                  </button>
                </>
              ) : (
                <div className="usersList">
                  <div>{user}</div>
                  <div>
                    <button
                      onClick={() => handleEdit(index)}
                      className="button"
                    >
                      Edit
                    </button>
                  </div>
                  <div>
                    <button
                      className="button"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListOfUsers;
