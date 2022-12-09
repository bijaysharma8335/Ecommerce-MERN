import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <Container>
            <Row>
                <Col md={6} className="signup_form-container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="text-success">Create your Account</h1>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your email"
                                value=""
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your email"
                                value=""
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit">Signup</Button>
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
