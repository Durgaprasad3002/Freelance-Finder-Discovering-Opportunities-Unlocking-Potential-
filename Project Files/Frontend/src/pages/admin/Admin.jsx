import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useGeneral } from "../../context/GeneralContext";
import { useState } from "react";
import "./Admin.css";

const Admin = () => {
  const { user, logout } = useGeneral();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="admin-layout">
      {/* Integrated Navbar */}
      <nav className="admin-navbar">
        <h2 className="admin-brand">
          <span className="brand-freelancer">SB</span>
          <span className="brand-hub">Works</span>
          <span className="admin-tag">Admin</span>
        </h2>

        {user && (
          <div className="admin-nav-right">
            <div className="user-profile">
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="admin-profile">
          <div className="admin-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="admin-info">
            <h3>{user?.name}</h3>
            <p>Administrator</p>
          </div>
        </div>

        <nav className="admin-nav-menu">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => window.innerWidth < 768 && setOpen(false)}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => window.innerWidth < 768 && setOpen(false)}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-text">All Users</span>
          </NavLink>

          <NavLink
            to="/admin/applications"
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => window.innerWidth < 768 && setOpen(false)}
          >
            <span className="nav-icon">📄</span>
            <span className="nav-text">All Applications</span>
          </NavLink>

          <NavLink
            to="/admin/projects"
            className={({ isActive }) => isActive ? "active" : ""}
            onClick={() => window.innerWidth < 768 && setOpen(false)}
          >
            <span className="nav-icon">🚀</span>
            <span className="nav-text">All Projects</span>
          </NavLink>

         
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout-btn">
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon">{open ? "✕" : "☰"}</span>
          </button>
          <div className="header-content">
            <h1>Admin Dashboard</h1>
            <p className="welcome-text">Welcome back, Administrator</p>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;