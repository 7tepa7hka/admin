import React, { useEffect, useState } from "react";
import "./Users.css";
import { toast, Bounce } from "react-toastify";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        toast.error("Ошибка при загрузке пользователей", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id, firstName, lastName) => {
    try {
      console.log(`Отправляем запрос на удаление пользователя с ID: ${id}`);

      const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Сервер подтвердил удаление пользователя:", result);

        toast.warn("удалён!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("ошибка!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (loading) {
    return <div className="loading">Загрузка списка пользователей...</div>;
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Управление пользователями</h1>
        <p>Всего зарегистрировано: {users.length}</p>
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Имя / Фамилия</th>
              <th>Username</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="user-name">
                  {user.name?.firstname} {user.name?.lastname}
                </td>
                <td className="user-username">@{user.username}</td>
                <td className="user-email">{user.email}</td>
                <td className="user-phone">{user.phone}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDeleteUser(
                        user.id,
                        user.name?.firstname,
                        user.name?.lastname,
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
