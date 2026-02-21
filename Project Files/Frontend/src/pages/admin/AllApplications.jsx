import { useEffect, useState, useContext } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";
 import "./AdminTables.css";
const AllApplications = () => {
  const { user } = useGeneral();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api
      .get(`/admin/applications?role=${user.role}`)
      .then(res => setApps(res.data));
  }, []);

 

return (
  <div className="admin-page">
    <h3>All Applications</h3>

    <div className="applications-grid">
      {apps.map(app => (
        <div key={app._id} className="application-card">
          <p><strong>Project:</strong> {app.projectId}</p>
          <p><strong>Freelancer:</strong> {app.freelancerId}</p>

          <span className={`status status-${app.status}`}>
            {app.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

};

export default AllApplications;
