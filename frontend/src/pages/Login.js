import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import "./Signup.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [login, { isError, isLoading, error }] = useLoginMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password })
            .then((res) => {
                navigate("/");
            })
            .catch((e) => console.log(e));
    };

    return (
        <Container>
            <Row>
                <Col md={6} className="login_form-container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="text-success">Login </h1>
                        <Form.Group className="mb-3">
                            {isError && (
                                <Alert variant="danger">{error.data}</Alert>
                            )}
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            </div>
                           
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type="submit" disabled={isLoading}>
                                Login
                            </Button>
                        </Form.Group>
                        <h6>
                            <span className="me-2"> Don't have a account?</span>
                            <Link to="/signup" className="text-decoration-none">
                                Create Account
                            </Link>
                        </h6>
                    </Form>
                </Col>
                <Col md={6} className="login_image-container"></Col>
            </Row>
        </Container>
    );
};

export default Login;
