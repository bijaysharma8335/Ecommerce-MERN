import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../services/appApi";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup({ name, email, password })
            .then((res) => {
                navigate("/login");
            })
            .catch((e) => console.log(e));
    };

    return (
        <Container>
            <Row>
                <Col md={6} className="signup_form-container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="text-success">Create your Account</h1>
                        {isError && (
                            <Alert variant="danger">{error.data}</Alert>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type="submit" disabled={isLoading}>
                                Signup
                            </Button>
                        </Form.Group>
                        <p>
                            Already have a account?
                            <Link to="/login">Login</Link>
                        </p>
                    </Form>
                </Col>
                <Col md={6} className="signup_image-container"></Col>
            </Row>
        </Container>
    );
};

export default Signup;
