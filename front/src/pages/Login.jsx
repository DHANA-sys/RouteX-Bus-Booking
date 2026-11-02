import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../Services/userService";
import "./Login.css"
import BackButton from "../components/BackButton";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return
    }
    else if (!password) {
      setError("Password is required");
      return;
    }
    else if (password.length < 8) {
      setError("Password must contain at least 8 characters");
      return;
    }

    try {
      const userData = {
        email: email,
        password: password
      };

      const response = await
        loginUser(userData);

      console.log("back response ", response.data)
      console.log("success value", response.data.success)

      // if (response.data === "LOGIN SUCESSFUL") {
      //   alert("LOGIN SUCEESS");

      if (response.data && response.data.id) {
      alert("LOGIN SUCCESS");

  localStorage.setItem("userId", response.data.id);
  localStorage.setItem("userEmail", response.data.email);


  localStorage.setItem("userName", response.data.fullName);
  localStorage.setItem("userPhone", response.data.phone);

        navigate("/");
      }
      else {
        setError("Invalid email or password")
      }
    } catch (error) {
      console.error(error);
      alert("LOGIN Failed")
    }
  }

  return (
    <>
        <div className="auth-container">

          <div className="login-back">
            <BackButton/>
          </div>
     
      <div className="auth-card">
        <div className="brand">
          <h1>Route<span>X</span></h1>
          <p>Every Route, One Journey</p>
        </div>

        <h2>Welcome Back!</h2>
        <p className="subtitle">Login to continue your journey.</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>

          <div className="input-box">
            <Mail size={19} />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>

          <div className="input-box">
            <Lock size={19} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button   
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="auth-button">
            Login →
          </button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
    </>

  );
}

export default Login;
