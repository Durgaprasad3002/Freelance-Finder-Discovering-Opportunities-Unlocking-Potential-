import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/axios";
import { useGeneral } from "../context/GeneralContext";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useGeneral();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      const user = res.data.user;

      if (!user) {
        setError("Invalid login response");
        setLoading(false);
        return;
      }

      // Store in context + localStorage
      login(user, rememberMe);

      // Role-based redirect
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "client") navigate("/client");
      else if (user.role === "freelancer") navigate("/freelancer");
      else navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const demos = {
      client: { email: "client@demo.com", password: "client123" },
      freelancer: { email: "freelancer@demo.com", password: "freelancer123" },
      admin: { email: "admin@demo.com", password: "admin123" }
    };
    
    setForm(demos[role]);
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>

        <button 
          type="submit" 
          className={loading ? 'loading' : ''}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="register-link">
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;