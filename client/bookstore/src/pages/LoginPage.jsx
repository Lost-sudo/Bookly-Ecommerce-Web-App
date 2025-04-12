import axios from "axios";
import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        formData
      );
      login(response.data);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.log(err);
    }
  };

  return (
    <Container
      fluid
      className="login-container d-flex justify-content-center align-items-center"
    >
      <div className="glass-card p-4 shadow-lg rounded-4">
        <div className="text-center mb-4">
          <img
            src="../../public/images/bookly-logo.png"
            alt="Bookly Logo"
            width={60}
            className="mb-2"
          />
          <h3 className="text-white">Welcome Back to Bookly</h3>
        </div>

        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Username</Form.Label>
            <Form.Control
              className="rounded-3 bg-dark text-white border-secondary"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              className="rounded-3 bg-dark text-white border-secondary"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mt-2 rounded-3 btn btn-primary"
          >
            Login
          </Button>

          <div className="text-center mt-3">
            <a href="/register" className="text-decoration-none text-info">
              Not yet registered?
            </a>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
