import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../Api/axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify-otp", { email, otp });
      alert("Email verified successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>

      <p>OTP sent to <b>{email}</b></p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
