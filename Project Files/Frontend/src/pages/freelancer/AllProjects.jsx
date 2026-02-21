import { useEffect, useState } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";
import "./Ap.css";

const AllProjects = () => {
  const { user } = useGeneral();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (!user || user.role !== "freelancer") {
    return <h3>Unauthorized</h3>;
  }

  if (loading) return <p>Loading projects...</p>;

  return (
    <div>
      <h2>Available Projects</h2>

      {projects.length === 0 ? (
        <p>No projects available</p>
      ) : (
        projects.map(project => (
          <div key={project._id} className="card">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <p><strong>Budget:</strong> {project.budget}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllProjects;
