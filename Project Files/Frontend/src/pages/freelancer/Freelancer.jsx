import { Link, Outlet, useLocation } from "react-router-dom";
import { useGeneral } from "../../context/GeneralContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Freelancer.css";

const Freelancer = () => {
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
    <div className="freelancer-layout">
      {/* Integrated Navbar */}
      <nav className="freelancer-navbar">
        <h2 className="freelancer-brand">
          <span className="brand-freelancer">SB</span>
          <span className="brand-hub">Works</span>
        </h2>

        {user && (
          <div className="freelancer-nav-right">
            <span className="user-info">{user.name} ({user.role})</span>
            <button onClick={handleLogout} className="freelancer-logout-btn">
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <aside className={`freelancer-sidebar ${open ? "open" : ""}`}>
        <div className="freelancer-profile">
          <div className="freelancer-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="freelancer-info">
            <h3>{user?.name}</h3>
            <p>Freelancer Panel</p>
          </div>
        </div>

        <nav className="freelancer-nav-menu">
  <Link
    to="/freelancer/projects"
    className={isActive("/freelancer/projects") ? "active" : ""}
    onClick={() => window.innerWidth < 768 && setOpen(false)}
  >
    <span className="nav-icon">📂</span>
    <span className="nav-text">All Projects</span>
  </Link>

  <Link
    to="/freelancer/applications"
    className={isActive("/freelancer/applications") ? "active" : ""}
    onClick={() => window.innerWidth < 768 && setOpen(false)}
  >
    <span className="nav-icon">📨</span>
    <span className="nav-text">My Applications</span>
  </Link>

  <Link
    to="/freelancer/working"
    className={isActive("/freelancer/working") ? "active" : ""}
    onClick={() => window.innerWidth < 768 && setOpen(false)}
  >
    <span className="nav-icon">🛠️</span>
    <span className="nav-text">Working Projects</span>
  </Link>

  <Link
    to="/freelancer/submissions"
    className={isActive("/freelancer/submissions") ? "active" : ""}
    onClick={() => window.innerWidth < 768 && setOpen(false)}
  >
    <span className="nav-icon">📤</span>
    <span className="nav-text">My Submissions</span>
  </Link>

 
  
   
</nav>
      </aside>

      {/* Main Section */}
      <div className="freelancer-main">
        {/* Header */}
        <header className="freelancer-header">
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon">{open ? "✕" : "☰"}</span>
          </button>
          <div className="header-content">
            <h1>Freelancer Dashboard</h1>
            <p className="welcome-text">Welcome back, {user?.name}</p>
          </div>
        </header>

        {/* Page Content */}
        <main className="freelancer-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Freelancer;