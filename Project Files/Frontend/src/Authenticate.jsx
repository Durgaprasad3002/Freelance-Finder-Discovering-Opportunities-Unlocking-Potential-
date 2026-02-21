import { Navigate, Outlet } from "react-router-dom";
import { useGeneral } from "../src/context/GeneralContext";

const Authenticate = ({ role }) => {
  const { user, loading } = useGeneral();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default Authenticate;
