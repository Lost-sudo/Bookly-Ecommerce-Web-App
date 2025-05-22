import { motion } from "framer-motion";
import { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLock } from "react-icons/fi";
import axios from "axios";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login/`,
        formData
      );
      login(response.data);
      console.log("Login response:", response.data);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.log(err);
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
                  Welcome Back
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Form.Group className="mb-3 position-relative">
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-end-0 text-secondary">
                        <FiUser />
                      </span>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Form.Group className="mb-4 position-relative">
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-end-0 text-secondary">
                        <FiLock />
                      </span>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
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
                    Login
                  </Button>
                  <div className="text-center text-secondary mt-4">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-primary text-decoration-none"
                      style={{ fontWeight: "500" }}
                    >
                      Sign Up
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

export default LoginPage;
