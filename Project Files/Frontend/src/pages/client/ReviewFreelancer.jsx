import { useState } from "react";
import api from "../../Api/axios";

const ReviewFreelancer = ({ project }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const submit = async () => {
    await api.post("/reviews", {
      projectId: project._id,
      freelancerId: project.freelancerId,
      clientId: project.clientId,
      rating,
      feedback
    });
    alert("Review submitted");
  };

  return (
    <>
      <input type="number" min="1" max="5" onChange={e => setRating(e.target.value)} />
      <textarea onChange={e => setFeedback(e.target.value)} />
      <button onClick={submit}>Submit Review</button>
    </>
  );
};

export default ReviewFreelancer;
