import { useEffect, useState } from "react";
import { useGeneral } from "../../context/GeneralContext";
import api from "../../Api/axios";
import ChatBox from "../../components/ChatBox";
import { Link } from "react-router-dom";

const WorkingProjects = () => {
  const { user } = useGeneral();
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get(
        `/applications/freelancer/${user.id}`
      );

      // Only show projects still in working state
      const accepted = res.data.filter(
        (p) => p.status === "accepted"
      );

      const unique = [
        ...new Map(
          accepted.map((p) => [p.projectId, p])
        ).values(),
      ];

      setProjects(unique);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchData();
  }, [user]);

  return (
    <div>
      <h2>Working Projects</h2>

      {projects.length === 0 && (
        <p>No active projects</p>
      )}

      {projects.map((p) => (
        <div key={p._id} className="card">
          <h4>Project: {p.projectId}</h4>

          <Link
            to={`/freelancer/submit-work/${p.projectId}/${p.clientId}`}
            className="submit-btn"
          >
            Submit Work
          </Link>

          {/* 🔥 Chat only if still accepted */}
          {p.status === "accepted" && (
            <ChatBox
              clientId={p.clientId}
              freelancerId={user.id}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkingProjects;
