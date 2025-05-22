import { motion } from "framer-motion";
import { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      setError(
        "Registration failed: " +
        (err.response?.data?.message ||
         err.response?.data?.detail ||
         JSON.stringify(err.response?.data) ||
         err.message)
      );
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #292929 100%)",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-100"
        style={{ maxWidth: "450px" }}
      >
        <Card
          className="bg-dark text-light border-0 shadow-lg"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(33, 37, 41, 0.85)",
          }}
        >
          <Card.Body className="p-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-center mb-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="gradient-text"
                >
                  Create Account
                </motion.span>
              </h2>

              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Alert
                    variant="danger"
                    className="border-0 bg-danger bg-opacity-10"
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              <Form onSubmit={handleSubmit}>
                {[
                  {
                    label: "Username",
                    name: "username",
                    type: "text",
                    icon: <FiUser />,
                    delay: 0.4,
                  },
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    icon: <FiMail />,
                    delay: 0.5,
                  },
                  {
                    label: "Password",
                    name: "password",
                    type: "password",
                    icon: <FiLock />,
                    delay: 0.6,
                  },
                  {
                    label: "Confirm Password",
                    name: "confirmPassword",
                    type: "password",
                    icon: <FiCheckCircle />,
                    delay: 0.7,
                  },
                ].map((field) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: field.delay }}
                  >
                    <Form.Group className="mb-3 position-relative">
                      <div className="input-group">
                        <span className="input-group-text bg-transparent border-end-0 text-secondary">
                          {field.icon}
                        </span>
                        <Form.Control
                          type={field.type}
                          name={field.name}
                          placeholder={field.label}
                          value={formData[field.name]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field.name]: e.target.value,
                            })
                          }
                          required
                          className="bg-transparent text-light border-start-0"
                          style={{
                            boxShadow: "none",
                            borderColor: "rgba(75, 139, 190, 0.2)",
                          }}
                        />
                      </div>
                    </Form.Group>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3 py-2 rounded-pill"
                    style={{
                      background:
                        "linear-gradient(90deg, #4b8bbe 0%, #306998 100%)",
                      border: "none",
                      boxShadow: "0 4px 15px rgba(75, 139, 190, 0.2)",
                    }}
                  >
                    Sign Up
                  </Button>
                  <div className="text-center text-secondary mt-4">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary text-decoration-none"
                      style={{ fontWeight: "500" }}
                    >
                      Login
                    </Link>
                  </div>
                </motion.div>
              </Form>
            </motion.div>
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default RegisterPage;
