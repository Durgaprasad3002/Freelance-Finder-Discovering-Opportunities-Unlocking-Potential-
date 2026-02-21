import { useEffect, useState } from "react";
import { useGeneral } from "../../context/GeneralContext";
import api from "../../Api/axios";
import ChatBox from "../../components/ChatBox";

const ProjectWorking = () => {
  const { user } = useGeneral();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/applications/client/${user.id}`);

      const accepted = res.data.filter(p => p.status === "accepted");

      const unique = [
        ...new Map(accepted.map(p => [p.projectId, p])).values()
      ];

      setProjects(unique);
    };

    if (user?.id) fetchData();
  }, [user]);

  return (
    <div>
      <h2>Working Projects</h2>

      {projects.length === 0 && <p>No active projects</p>}

      {projects.map(p => (
        <div key={p._id} className="card">
          <h4>Project: {p.projectId}</h4>

          <ChatBox
            clientId={user.id}
            freelancerId={p.freelancerId}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectWorking;
