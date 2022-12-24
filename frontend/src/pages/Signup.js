import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../services/appApi";
import "./Signup.css";
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
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
                            <div className="password-show">
                                <div
                                    className="password_icon"
                                    onClick={() =>
                                        setPasswordVisible(!passwordVisible)
                                    }
                                >
                                    {passwordVisible ? (
                                        <AiFillEye />
                                    ) : (
                                        <AiFillEyeInvisible />
                                    )}
                                </div>{" "}
                                <Form.Control
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Enter Your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type="submit" disabled={isLoading}>
                                Signup
                            </Button>
                        </Form.Group>
                        <h6>
                            <span className="me-2">
                                Already have a account?
                            </span>
                            <Link to="/login" className="text-decoration-none">
                                Login
                            </Link>
                        </h6>
                    </Form>
                </Col>
                <Col md={6} className="signup_image-container"></Col>
            </Row>
        </Container>
    );
};

export default Signup;
