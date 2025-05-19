import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../api/user";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authTokens } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getUser(authTokens?.access);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authTokens?.access) {
      getProfile();
    }
  }, [authTokens]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="loading-spinner"></div>
      </Container>
    );
  }

  return (
    <Container className="py-5 text-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-primary">Your Profile</h2>
        {user && (
          <Row>
            <Col lg={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-dark border border-primary text-light rounded-3 shadow-sm h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="text-center mb-4">
                      <div className="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                           style={{ width: "80px", height: "80px" }}>
                        <FaUser size={40} />
                      </div>
                      <h5 className="fw-bold">{user.full_name}</h5>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                    <div className="mt-auto">
                      <Button variant="outline-primary" className="w-100 mb-2">
                        Edit Profile
                      </Button>
                      <Button variant="outline-secondary" className="w-100">
                        Change Password
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col lg={8}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-dark border border-primary text-light rounded-3 shadow-sm">
                  <Card.Body>
                    <h5 className="fw-semibold text-primary mb-4">
                      Personal Information
                    </h5>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaUser className="text-primary me-2" />
                              <Form.Label className="mb-0">Full Name</Form.Label>
                            </div>
                            <Form.Control
                              type="text"
                              value={user.full_name}
                              className="bg-dark text-light border-secondary"
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaEnvelope className="text-primary me-2" />
                              <Form.Label className="mb-0">Email Address</Form.Label>
                            </div>
                            <Form.Control
                              type="email"
                              value={user.email}
                              className="bg-dark text-light border-secondary"
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaPhone className="text-primary me-2" />
                              <Form.Label className="mb-0">Phone</Form.Label>
                            </div>
                            <Form.Control
                              type="text"
                              value={user.phone_number || "Not provided"}
                              className="bg-dark text-light border-secondary"
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <div className="d-flex align-items-center mb-2">
                              <FaMapMarkerAlt className="text-primary me-2" />
                              <Form.Label className="mb-0">Address</Form.Label>
                            </div>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              value={user.address || "Not provided"}
                              className="bg-dark text-light border-secondary"
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        )}
      </motion.div>
    </Container>
  );
};

export default ProfilePage;
