import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./AdminProfilePage.css";
const EditAdminProfilePage = () => {
    const user = useSelector((state) => state.user);
    return (
        <Container style={{ width: "70%" }}>
            <h1 className="text-center my-3">Profile </h1>

            <div className="profile-header bg-light my-3 p-4">
                <h5>User:{user.name}</h5>
                <Button>Save</Button>
            </div>
            <div className="bg-light p-3 my-1">
                <div className="profile-header">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt=""
                        className="profile-img"
                    />
                    <h5>
                        <p>{user.name}</p>
                        <span className="text-primary">{user.email}</span> -
                        <span className="text-secondary">Administrator</span>
                    </h5>
                </div>
                <h4>Account</h4>
                <Form>
                    <Form.Group className="mb-2">
                        <Row>
                            <Col md={6}>
                                <Form.Label>UserName</Form.Label>
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    className="text"
                                    value={user.name}
                                 
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Row>
                            <Col md={6}>
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    className="email"
                                    value={user.email}
                                  
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Row>
                            <Col md={6}>
                                <Form.Label>Password</Form.Label>
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    className="password"
                                    placeholder="********"
                                    value={user.password}
                                    
                                />
                            </Col>{" "}
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Row>
                            <Col md={6}>
                                <Form.Label>FullName</Form.Label>
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    className="text"
                                    value={user.name}
                                   
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Row>
                            <Col md={6}>
                                <Form.Label>Title</Form.Label>
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    className="text"
                                    value={user.name}
                                    
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    );
};

export default EditAdminProfilePage;
