import React, { useEffect, useState } from "react";
import {
    Badge,
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/react-alice-carousel";
import { LinkContainer } from "react-router-bootstrap";

import axios from "../apiApi";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";

const ProductPage = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.user);

    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    let similarProducts = [];
    const [addToCart, { isSuccess }] = useAddToCartMutation();

    const handleDragStart = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        axios.get(`/products/${id}`).then((res) => {
            setProduct(res.data.product);
            setSimilar(res.data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };
    const images = product.pictures.map((picture) => (
        <img
            className="product_carousel-image"
            src={picture.url}
            alt=""
            onDragStart={handleDragStart}
        />
    ));

    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }
    return (
        <Container className="pt-4" style={{ position: "relative" }}>
            <Row>
                <Col lg={6}>
                    <AliceCarousel
                        mouseTracking
                        items={images}
                        controlsStrategy="alternate"
                    />
                </Col>
                <Col lg={6} className="pt-4">
                    <h1>{product.name}</h1>
                    <p>
                        <Badge bg="primary">{product.category}</Badge>
                    </p>
                    <p className="product_price">${product.price}</p>
                    <p className="py-3" style={{ textAlign: "center" }}>
                        {product.description}
                    </p>

                    {user && !user.isAdmin && (
                        <ButtonGroup style={{ width: "90%" }}>
                            <Form.Select
                                size="lg"
                                style={{ width: "40%", borderRadius: "0" }}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                            <Button
                                size="lg"
                                disabled={!user}
                                onClick={() =>
                                    addToCart({
                                        userId: user._id,
                                        productId: id,
                                        price: product.price,
                                        image: product.pictures[0].url,
                                    })
                                }
                            >
                                Add to Cart
                            </Button>
                        </ButtonGroup>
                    )}

                    {user && user.isAdmin && (
                        <LinkContainer to={`/product/${product._id}/edit`}>
                            <Button size="lg">Edit Product</Button>
                        </LinkContainer>
                    )}
                    {isSuccess && (
                        <ToastMessage
                            bg="info"
                            title="Added to cart"
                            body={`${product.name} is in your cart`}
                        />
                    )}
                </Col>
            </Row>
            <div className="my-4">
                <h2>Similar products</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <AliceCarousel
                        mouseTracking
                        items={similarProducts}
                        responsive={responsive}
                        controlsStrategy="alternate"
                    />
                </div>
            </div>
        </Container>
    );
};

export default ProductPage;
