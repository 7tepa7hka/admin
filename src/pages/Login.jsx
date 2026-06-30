import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login === "admin" && password === "12345") {
      localStorage.setItem("token", "true");

      toast.success("Успешный вход! секундочку...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      toast.error("Неверный логин или пароль", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход в админку</h2>
        <p className="login-subtitle">Введите учетные данные</p>

        <div className="input-group">
          <label htmlFor="login">Логин</label>
          <input
            type="text"
            id="login"
            placeholder="admin"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="12345"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Войти
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
