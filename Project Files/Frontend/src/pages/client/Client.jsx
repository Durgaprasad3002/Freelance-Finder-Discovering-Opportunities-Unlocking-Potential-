import { Link, Outlet, useLocation } from "react-router-dom";
import { useGeneral } from "../../context/GeneralContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Client.css";

const Client = () => {
  const { user, logout } = useGeneral();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="client-layout">
      {/* Integrated Navbar */}
      <nav className="client-navbar">
        <h2 className="client-brand">
          <span className="brand-freelancer">SB</span>
          <span className="brand-hub">Works</span>
        </h2>

        {user && (
          <div className="client-nav-right">
            <span className="user-info">{user.name} ({user.role})</span>
            <button onClick={handleLogout} className="client-logout-btn">
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <aside className={`client-sidebar ${open ? "open" : ""}`}>
        <div className="client-profile">
          <div className="client-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="client-info">
            <h3>{user?.name}</h3>
            <p>Client Panel</p>
          </div>
        </div>

        <nav className="client-nav-menu">
          <Link
            to="/client/new-project"
            className={isActive("/client/new-project") ? "active" : ""}
            onClick={() => window.innerWidth < 768 && setOpen(false)}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">Post Project</span>
          </Link>

          <Link
            to="/client/applications"
            className={isActive("/client/applications") ? "active" : ""}
            onClick={() => window.innerWidth < 768 && setOpen(false)}
          >
            <span className="nav-icon">📩</span>
            <span className="nav-text">Applications</span>
          </Link>

          <Link
            to="/client/working"
            className={isActive("/client/working") ? "active" : ""}
            onClick={() => window.innerWidth < 768 && setOpen(false)}
          >
            <span className="nav-icon">🛠️</span>
            <span className="nav-text">Working Projects</span>
          </Link>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="client-main">
        {/* Header */}
        <header className="client-header">
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon">{open ? "✕" : "☰"}</span>
          </button>
          <div className="header-content">
            <h1>Client Dashboard</h1>
            <p className="welcome-text">Welcome back, {user?.name}</p>
          </div>
        </header>

        {/* Page Content */}
        <main className="client-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Client;