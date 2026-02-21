import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";

const SubmitWork = () => {
  const { projectId, clientId } = useParams();
  const { user } = useGeneral();
  const navigate = useNavigate();

  const [workLink, setWorkLink] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/submissions/submit", {
        projectId,
        freelancerId: user.id,
        clientId,
        workLink,
        description
      });

      alert("✅ Work submitted successfully");
      navigate("/freelancer/working");
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed");
    }
  };

  return (
    <form onSubmit={submit} className="form-card">
      <h2>Submit Work</h2>

      <input
        placeholder="GitHub / Drive link"
        value={workLink}
        onChange={(e) => setWorkLink(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitWork;
