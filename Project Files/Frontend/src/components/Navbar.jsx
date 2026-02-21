import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneral } from "../context/GeneralContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useGeneral();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // return (
  //  <nav className="navbar">
  // <h2 className="brand">
  //   <span className="brand-freelancer">Freelancer</span>
  //   <span className="brand-hub">Hub</span>
  // </h2>

//   {user && (
//     <div className="nav-right">
//       <span>{user.name} ({user.role})</span>
//       <button onClick={handleLogout} className="logout-btn">
//         Logout
//       </button>
//     </div>
//   )}
// </nav>

//   );
};

export default Navbar;
