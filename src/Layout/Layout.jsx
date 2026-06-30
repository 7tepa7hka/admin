import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import { toast, ToastContainer, Bounce } from "react-toastify";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.warn("Вы выходите из системы 👋🏻", {
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

    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>AdminPanel</h2>
        </div>

        <nav className="sidebar-menu">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            Users
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <span className="welcome-text">Добро пожаловать, Admin</span>
        </header>

        <div className="page-body">
          <Outlet />
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}

export default Layout;
