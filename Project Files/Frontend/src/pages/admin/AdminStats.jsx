import { useEffect, useState } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";

const AdminStats = () => {
  const { user } = useGeneral();

  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    applications: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats?role=admin");
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!user || user.role !== "admin") {
    return <h3>Unauthorized</h3>;
  }

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>{stats.projects}</p>
        </div>

        <div className="stat-card">
          <h3>Total Applications</h3>
          <p>{stats.applications}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
