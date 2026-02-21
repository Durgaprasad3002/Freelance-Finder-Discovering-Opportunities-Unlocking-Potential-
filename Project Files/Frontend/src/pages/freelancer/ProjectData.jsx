import { useEffect, useState } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";
import "./Pd.css";

const ProjectData = () => {
  const { user } = useGeneral();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [proposal, setProposal] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  const submitBid = async e => {
    e.preventDefault();
    await api.post("/applications/apply", {
      projectId: selectedProject._id,
      freelancerId: user.id,
      clientId: selectedProject.clientId,
      proposal,
      bidAmount,
      role: "freelancer"
    });
    alert("Bid submitted");
    setSelectedProject(null);
    setProposal("");
    setBidAmount("");
  };

  return (
    <div className="container">
      <h2>Available Projects</h2>
      
      <div className="projects-grid">
        {projects.map(p => (
          <div key={p._id} className="card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>Budget: ₹{p.budget}</p>
            <button onClick={() => setSelectedProject(p)}>
              Bid on Project
            </button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <form 
            className="form-card" 
            onSubmit={submitBid}
            onClick={e => e.stopPropagation()}
          >
            <h3>Bid for {selectedProject.title}</h3>
            
            <textarea
              value={proposal}
              onChange={e => setProposal(e.target.value)}
              placeholder="Write your proposal..."
              required
            />

            <input
              type="number"
              value={bidAmount}
              onChange={e => setBidAmount(e.target.value)}
              placeholder="Enter your bid amount (₹)"
              required
            />

            <div className="form-actions">
              <button type="submit">Submit Bid</button>
              <button type="button" onClick={() => setSelectedProject(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectData;