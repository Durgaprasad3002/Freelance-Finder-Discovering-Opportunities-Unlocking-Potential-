import { useEffect, useState } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";

const MyProjects = () => {
  const { user } = useGeneral();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(
        `/applications/freelancer/${user.id}`
      );

      // Only accepted ones
      const accepted = res.data.filter(
        app => app.status === "accepted"
      );

      setProjects(accepted);
    };

    if (user?.id) fetch();
  }, [user]);

  if (!user || user.role !== "freelancer") {
    return <h3>Unauthorized</h3>;
  }

  return (
    <div>
      <h2>My Projects</h2>

      {projects.length === 0 ? (
        <p>No active projects</p>
      ) : (
        projects.map(p => (
          <div key={p._id} className="card">
            <p><strong>Project ID:</strong> {p.projectId}</p>
            <p>Status: {p.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyProjects;
