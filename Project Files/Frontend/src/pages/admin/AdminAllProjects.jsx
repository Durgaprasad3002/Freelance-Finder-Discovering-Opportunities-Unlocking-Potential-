import { useEffect, useState } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";

const skillsList = [
  "Python",
  "Javascript",
  "Django",
  "HTML",
  "MongoDB",
  "Express",
  "React",
  "Nodejs"
];

const AdminAllProjects = () => {
  const { user } = useGeneral();

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch projects whenever skills change
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let url = `/admin/projects?role=admin`;

        if (selectedSkills.length > 0) {
          url += `&skills=${selectedSkills.join(",")}`;
        }

        const res = await api.get(url);
        setFilteredProjects(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedSkills]);

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", borderRight: "1px solid #ccc" }}>
        <h3>Filters</h3>
        <p><strong>Skills</strong></p>

        {skillsList.map((skill) => (
          <div key={skill}>
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill)}
              onChange={() => handleSkillChange(skill)}
            />
            <label style={{ marginLeft: "8px" }}>{skill}</label>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div style={{ flex: 1 }}>
        <h2>All Projects</h2>

        {filteredProjects.length === 0 ? (
          <p>No projects found</p>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "6px"
              }}
            >
              <h3>{project.title}</h3>
              <p><strong>Budget:</strong> ₹{project.budget}</p>
              <p><strong>Skills:</strong> {project.skills?.join(", ")}</p>
              <p>{project.description}</p>
              <small>
                Posted on:{" "}
                {project.createdAt
                  ? new Date(project.createdAt).toLocaleString()
                  : "N/A"}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminAllProjects;
