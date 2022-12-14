import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../services/appApi";
import "./NewProduct.css";

const NewProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [imgToRemove, setImgToRemove] = useState(null);
    const [images, setImages] = useState("");
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] =
        useCreateProductMutation();
    return (
        <Container>
            <Row>
                <Col md={6} className="newproduct_form-container">
                    <Form style={{ width: "100%" }}>
                        <h1 className="text-success">Create a product </h1>
                        <Form.Group>
                            {isError && (
                                <Alert variant="danger">{error.data}</Alert>
                            )}
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Your email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Your password"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" disabled={isLoading}>
                                Login
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="newproduct_image-container"></Col>
            </Row>
        </Container>
    );
};

export default NewProduct;
