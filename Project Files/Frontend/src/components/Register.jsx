import { useState } from "react";
import api from "../Api/axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Calculate password strength when password changes
    if (name === "password") {
      calculatePasswordStrength(value);
    }
    
    // Clear any previous errors when user starts typing
    if (error) setError("");
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Medium";
    return "Strong";
  };

  const getPasswordStrengthClass = () => {
    if (passwordStrength <= 2) return "strength-weak";
    if (passwordStrength <= 4) return "strength-medium";
    return "strength-strong";
  };

  const selectRole = (role) => {
    setForm({ ...form, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Simple validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", form);
      setSuccess(true);
      
      // Show success and then redirect
      setTimeout(() => {
        alert("OTP sent to your email");
        navigate("/verify-otp", { state: { email: form.email } });
      }, 500);
      
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="header">
        <div className="logo">SB WORKS</div>
        <h2>Create Your Account</h2>
        <p>Join thousands of freelancers and clients worldwide</p>
      </div>
      
      <div className="form-container">
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            Registration successful! Redirecting to OTP verification...
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-icon">
              <i className="fas fa-user"></i>
            </div>
            <input
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <i className="fas fa-lock"></i>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Create a strong password"
              required
              value={form.password}
              onChange={handleChange}
            />
            
            {form.password && (
              <>
                <div className="password-strength">
                  <div className={`strength-bar ${getPasswordStrengthClass()}`}></div>
                </div>
                <div className="password-hint">
                  <i className="fas fa-info-circle"></i>
                  Password strength: {getPasswordStrengthText()} 
                  {passwordStrength <= 2 && " (Add uppercase, numbers & symbols)"}
                </div>
              </>
            )}
          </div>
          
          <div className="form-group">
            <label>Select Your Role</label>
            <div className="role-selection">
              <div 
                className={`role-option ${form.role === 'freelancer' ? 'selected' : ''}`}
                onClick={() => selectRole('freelancer')}
              >
                <i className="fas fa-code role-icon"></i>
                Freelancer
              </div>
              
              <div 
                className={`role-option ${form.role === 'client' ? 'selected' : ''}`}
                onClick={() => selectRole('client')}
              >
                <i className="fas fa-briefcase role-icon"></i>
                Client
              </div>
              
            </div>
          </div>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus" style={{marginRight: '8px'}}></i>
                Create Account
              </>
            )}
          </button>
        </form>
        
        <div className="login-link">
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Register;