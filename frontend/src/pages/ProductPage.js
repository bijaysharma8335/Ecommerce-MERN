import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";

const ProductPage = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.user);

    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
    const images = product.pictures.map();
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
            </Row>
        </Container>
    );
};

export default ProductPage;
