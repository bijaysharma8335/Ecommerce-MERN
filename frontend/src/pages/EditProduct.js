import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import axios from "../apiApi.js";
import { useUpdateProductMutation } from "../services/appApi";
import "./NewProduct.css";
import { useLocation } from "react-router-dom";

const EditProductPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const [name, setName] = useState(location.state.name);
    const [description, setDescription] = useState(location.state.description);
    const [price, setPrice] = useState(location.state.price);
    const [category, setCategory] = useState(location.state.category);
    const [imgToRemove, setImgToRemove] = useState(null);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const [updateProduct, { isError, error, isLoading, isSuccess }] =
        useUpdateProductMutation();

    useEffect(() => {
        axios
            .get("/products/" + id)
            .then((res) => {
                const product = res.data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setImages(product.pictures);
                setPrice(product.price);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);

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

    const handleRemoveImg = (imgObj) => {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) =>
                    prev.filter((img) => img.public_id !== imgObj.public_id)
                );
            })
            .catch((e) => console.log(e));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            images.length === 0
        ) {
            return alert("please fill out the fields");
        }
        updateProduct({ id, name, description, price, category, images }).then(
            ({ data }) => {
                if (data.length > 0) {
                    setTimeout(() => {
                        navigate("/");
                    }, 1500);
                }
            }
        );
    };
    return (
        <Container>
            <Row>
                <Col md={6} className="newproduct_form-container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className=" mt-4">Edit product </h1>{" "}
                        {isSuccess && (
                            <Alert variant="success">Product updated</Alert>
                        )}
                        {isError && (
                            <Alert variant="danger">{error.data}</Alert>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Product Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Product Description"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ height: "100px" }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Price($)"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <Form.Label>Category</Form.Label>
                            <Form.Select value={category}>
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
                                {images.map((image, i) => (
                                    <div className="img_preview" key={i}>
                                        <img src={image.url} alt="" />
                                        {imgToRemove !== image.public_id && (
                                            <FaTimesCircle
                                                className="image_preview_icon"
                                                onClick={() =>
                                                    handleRemoveImg(image)
                                                }
                                            />
                                        )}
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
                                Update Product
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="newproduct_image-container"></Col>
            </Row>
        </Container>
    );
};

export default EditProductPage;
