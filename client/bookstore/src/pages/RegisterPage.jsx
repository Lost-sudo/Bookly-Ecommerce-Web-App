import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/register/", formData);
      setSuccess("Registration successful. Please Login");
    } catch (error) {
      setError("Registration failed: " + error.response.data.message);
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
          <h3 className="text-white">Create Your Account</h3>
        </div>

        <Form onSubmit={handleSubmit}>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Full Name</Form.Label>
            <Form.Control
              className="rounded-3 bg-dark text-white border-secondary"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </Form.Group>

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
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              className="rounded-3 bg-dark text-white border-secondary"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
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
            Register
          </Button>

          <div className="text-center mt-3">
            <a href="/login" className="text-decoration-none text-info">
              Already have an account?
            </a>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterPage;
