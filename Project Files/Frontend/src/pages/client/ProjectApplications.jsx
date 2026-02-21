import { useEffect, useState } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";
import "./Pa.css";

const ProjectApplications = () => {
  const { user } = useGeneral();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user?.id) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/applications/client/${user.id}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setUpdating(id);
      await api.put(`/applications/${id}/status`, {
        role: "client",
        status
      });

      setApplications(apps =>
        apps.map(a => (a._id === id ? { ...a, status } : a))
      );
      
      // Show success feedback
      alert(`Application ${status === "accepted" ? "accepted" : "rejected"} successfully!`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update application status");
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredApplications = applications.filter(app => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  if (!user || user.role !== "client") {
    return (
      <div className="unauthorized">
        <h3>🔒 Unauthorized Access</h3>
        <p>Please login as a client to view applications.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <h2>Project Applications</h2>
      
      {/* Filter Buttons */}
      <div className="filter-section">
        <button 
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Applications
        </button>
        <button 
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button 
          className={`filter-btn ${filter === "accepted" ? "active" : ""}`}
          onClick={() => setFilter("accepted")}
        >
          Accepted
        </button>
        <button 
          className={`filter-btn ${filter === "rejected" ? "active" : ""}`}
          onClick={() => setFilter("rejected")}
        >
          Rejected
        </button>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📩</div>
          <h3 className="empty-text">
            {filter === "all" ? "No Applications Yet" : `No ${filter} applications`}
          </h3>
          <p className="empty-subtext">
            {filter === "all" 
              ? "Applications from freelancers will appear here when you post projects." 
              : `You don't have any ${filter} applications.`
            }
          </p>
        </div>
      ) : (
        <div className="applications-grid">
          {filteredApplications.map(app => (
            <div 
              key={app._id} 
              className={`application-card ${updating === app._id ? "status-updating" : ""}`}
            >
              <div className="card-header">
                <div>
                  <h3 className="project-title">{app.projectId?.title || "Project"}</h3>
                  <p className="freelancer-name">
                    {app.freelancerId?.name || "Freelancer"}
                  </p>
                </div>
                <span className={`status-badge status-${app.status}`}>
                  {app.status}
                </span>
              </div>

              <div className="card-content">
                <div className="bid-amount">
                  ₹{app.bidAmount?.toLocaleString() || "0"}
                </div>
                <div className="bid-label">Proposed Budget</div>

                <div className="proposal-section">
                  <div className="proposal-label">Proposal</div>
                  <div className="proposal-text">
                    {app.proposal || "No proposal provided."}
                  </div>
                </div>

                {app.createdAt && (
                  <div className="timestamp">
                    Applied on: {formatDate(app.createdAt)}
                  </div>
                )}
              </div>

              <div className="card-footer">
                <button 
                  className="action-btn view"
                  onClick={() => alert("View freelancer profile feature coming soon!")}
                >
                  View Profile
                </button>
                
                {app.status === "pending" && (
                  <div className="actions">
                    <button 
                      className="action-btn accept"
                      onClick={() => updateStatus(app._id, "accepted")}
                      disabled={updating === app._id}
                    >
                      {updating === app._id ? "Updating..." : "Accept"}
                    </button>
                    <button 
                      className="action-btn reject"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to reject this application?")) {
                          updateStatus(app._id, "rejected");
                        }
                      }}
                      disabled={updating === app._id}
                    >
                      {updating === app._id ? "Updating..." : "Reject"}
                    </button>
                  </div>
                )}

                {app.status !== "pending" && (
                  <div className="status-info">
                    <strong>Status:</strong> Application {app.status}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectApplications;