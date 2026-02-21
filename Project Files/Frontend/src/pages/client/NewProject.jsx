import { useState } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";
import "./Newp.css";

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

const NewProject = () => {
  const { user } = useGeneral();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: ""
  });

  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle skills checkbox
  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const submitProject = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        description: form.description,
        budget: form.budget,
        skills: selectedSkills,   // ✅ ADD THIS
        clientId: user.id
      };

      console.log("Sending payload:", payload);

      await api.post("/projects", payload);

      alert("✅ Project created successfully");

      setForm({ title: "", description: "", budget: "" });
      setSelectedSkills([]);   // reset skills
    } catch (err) {
      console.error("Create project error:", err.response?.data || err.message);
      alert("❌ Failed to create project");
    }
  };

  if (!user || user.role !== "client") {
    return <h3>Unauthorized</h3>;
  }

  return (
    <form onSubmit={submitProject} className="form-card">
      <h2>Create New Project</h2>

      <input
        name="title"
        placeholder="Project Title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        name="budget"
        placeholder="Budget"
        value={form.budget}
        onChange={handleChange}
        required
      />

      {/* ✅ SKILLS SECTION */}
      <div style={{ marginTop: "15px" }}>
        <h4>Select Required Skills</h4>

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

      <button type="submit" style={{ marginTop: "15px" }}>
        Create Project
      </button>
    </form>
  );
};

export default NewProject;
