import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { useCreateProductMutation } from "../services/appApi";
import "./NewProduct.css";

const NewProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [imgToRemove, setImgToRemove] = useState(null);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] =
        useCreateProductMutation();

    const showWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dqblxqx8k",
                uploadPreset: "uiypwzyc",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [
                        ...prev,
                        {
                            url: result.info.url,
                            public_id: result.info.public_id,
                        },
                    ]);
                }
            }
        );
        widget.open();
    };

    const handleRemoveImg = (imageObj) => {
        setImgToRemove(imageObj.public_id);
    };
    return (
        <Container>
            <Row>
                <Col md={6} className="newproduct_form-container">
                    <Form style={{ width: "100%" }}>
                        <h1 className="text-success">Create a product </h1>
                        <Form.Group className="mb-3">
                            {isSuccess && (
                                <Alert variant="success">
                                    Product Created successfully!
                                </Alert>
                            )}
                            {isError && (
                                <Alert variant="danger">{error.data}</Alert>
                            )}
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Product Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Product Description"
                                vaue={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ height: "100px" }}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Price($)"
                                vaue={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                <option disabled value="">
                                    ---------Select one--------
                                </option>
                                <option value="technology">Technology</option>
                                <option value="tablets">Tablets</option>
                                <option value="laptops">Laptops</option>
                                <option value="phones">Phones</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>
                                Upload Images
                            </Button>
                            <div className="images_preview-container">
                                {images.map((image) => (
                                    <div className="img_preview">
                                        <img src={image.url} alt="" />
                                        <FaTimesCircle
                                            className="image_preview_icon"
                                            onClick={() =>
                                                handleRemoveImg(image)
                                            }
                                        />
                                        {/* add icon fro removing */}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Button
                                type="submit"
                                disabled={isLoading || isSuccess}
                            >
                                Create Product
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
