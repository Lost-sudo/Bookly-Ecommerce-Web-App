import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext.jsx";
import { getUser } from "../api/user";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authTokens } = useAuth();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoForm, setInfoForm] = useState({ full_name: "", address: "" });
  const [saving, setSaving] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    address: "",
    phone_number: "",
  });
  const [editSaving, setEditSaving] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

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

  useEffect(() => {
    if (user && (!user.full_name || !user.address)) {
      setInfoForm({
        full_name: user.full_name || "",
        address: user.address || "",
      });
      setShowInfoModal(true);
    }
  }, [user]);

  const handleInfoChange = (e) => {
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });
  };

  const handleInfoSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/profile/`,
        infoForm,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      setUser((prev) => ({ ...prev, ...infoForm }));
      setShowInfoModal(false);
    } catch (err) {
      alert("Failed to update info.");
    }
    setSaving(false);
  };

  const handleEditOpen = () => {
    setEditForm({
      full_name: user.full_name || "",
      address: user.address || "",
      phone_number: user.phone_number || "",
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setEditSaving(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/auth/profile/`,
        editForm,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      setUser((prev) => ({ ...prev, ...editForm }));
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to update profile.");
    }
    setEditSaving(false);
  };

  const handleChangePasswordOpen = () => {
    setPasswordForm({
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    });
    setPasswordError("");
    setShowChangePasswordModal(true);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleChangePasswordSave = async (e) => {
    e.preventDefault();
    setPasswordError("");
    if (passwordForm.new_password !== passwordForm.confirm_new_password) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordSaving(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/change-password/`,
        {
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
      setShowChangePasswordModal(false);
      alert("Password changed successfully.");
    } catch (err) {
      setPasswordError(
        err.response?.data?.detail ||
          err.response?.data?.current_password?.[0] ||
          "Failed to change password."
      );
    }
    setPasswordSaving(false);
  };

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
                      <div
                        className="bg-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <FaUser size={40} />
                      </div>
                      <h5 className="fw-bold">{user.full_name}</h5>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                    <div className="mt-auto">
                      <Button
                        variant="outline-primary"
                        className="w-100 mb-2"
                        onClick={handleEditOpen}
                      >
                        Edit Profile
                      </Button>
                      <Button
                        variant="outline-secondary"
                        className="w-100"
                        onClick={handleChangePasswordOpen}
                      >
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
                              <Form.Label className="mb-0">
                                Full Name
                              </Form.Label>
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
                              <Form.Label className="mb-0">
                                Email Address
                              </Form.Label>
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
      <Modal show={showInfoModal} backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Complete Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInfoSave}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="full_name"
                value={infoForm.full_name}
                onChange={handleInfoChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={infoForm.address}
                onChange={handleInfoChange}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="mt-3"
              variant="primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSave}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="full_name"
                value={editForm.full_name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone_number"
                value={editForm.phone_number}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={editForm.address}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="mt-3"
              variant="primary"
              disabled={editSaving}
            >
              {editSaving ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChangePasswordSave}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="current_password"
                value={passwordForm.current_password}
                onChange={handlePasswordInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="new_password"
                value={passwordForm.new_password}
                onChange={handlePasswordInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm_new_password"
                value={passwordForm.confirm_new_password}
                onChange={handlePasswordInputChange}
                required
              />
            </Form.Group>
            {passwordError && (
              <div className="text-danger mb-2">{passwordError}</div>
            )}
            <Button
              type="submit"
              className="mt-2"
              variant="primary"
              disabled={passwordSaving}
            >
              {passwordSaving ? "Saving..." : "Change Password"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
