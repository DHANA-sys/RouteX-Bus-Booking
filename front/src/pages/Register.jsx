import { useState } from "react";
import { registerUser } from "../Services/userService";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import "./Register.css";
import BackButton from "../components/BackButton";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""

  });

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }


    alert("Registration validation successful!");



    try {
      const userData = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password
      };

      const response = await
        registerUser(userData);
      console.log("back response ", response.userData)
      alert("REGISTER SUCEESS");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Register Failed")
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }



  return (
    <div className="register-container">
      <div className="sign-back">
            <BackButton/>
      </div>
      
      <div className="register-card">

        <div className="register-brand">
          <h1>
            Route<span>X</span>
          </h1>

          <p>Every Route, One Journey</p>
        </div>

        <h2>Create Account</h2>

        <p className="register-subtitle">
          Join RouteX and start your journey.
        </p>

        <form onSubmit={handleRegister}>

          <label>Full Name</label>

          <div className="register-input">
            <User size={19} />

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <label>Email Address</label>

          <div className="register-input">
            <Mail size={19} />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <label>Phone Number</label>

          <div className="register-input">
            <Phone size={19} />

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <label>Password</label>

          <div className="register-input">
            <Lock size={19} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="button"
              className="register-eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Show or hide password"
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          <label>Confirm Password</label>

          <div className="register-input">
            <Lock size={19} />

            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="register-error">
              {error}
            </p>
          )}

          <button type="submit" className="register-button">
            Create Account →
          </button>

        </form>

        <p className="register-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
