import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const ListOfUsers = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const openModal = (index) => {
    setUserToDelete(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const confirmDelete = () => {
    handleDelete(userToDelete);
    setModalIsOpen(false);
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
                  <div className="button_list button_margin">
                    <button onClick={handleSave} className="button">
                      Save
                    </button>
                    <button onClick={handleCancel} className="button ">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="usersList">
                  <div>{user}</div>
                  <div className="button_list">
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
                        onClick={() => openModal(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete User Confirmation"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
          content: {
            color: "lightsteelblue",
            width: "300px",
            height: "170px",
            margin: "auto",
            padding: "10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          },
        }}
      >
        <h2>Are you sure you want to delete this user?</h2>
        <div className="button_list">
          <button onClick={confirmDelete} className="button">
            Yes
          </button>
          <button onClick={closeModal} className="button">
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ListOfUsers;
