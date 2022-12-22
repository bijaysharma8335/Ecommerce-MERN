import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from "react-redux";
import categories from "../Categories";
import "./Home.css";
import axios from "../apiApi.js";

import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const lastProducts = products;
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };


    useEffect(() => {
        axios.get("/products").then((res) => dispatch(updateProducts(res)));
    }, []);

    const items = [
        <div className="item" data-value="1">
            <img
                src=" https://www.skubana.com/hubfs/Skubana/Blog%20Pages/Imported_Blog_Media/ecommerce%20tools.jpg"
                className="home_banner"
                alt=""
            />
        </div>,
        <div className="item" data-value="2">
            <img
                src="https://dsn0yv0bfu3gb.cloudfront.net/wp-content/uploads/2017/12/ecommerce-and-shopping-banner.jpg"
                alt=""
                className="home_banner"
            />
        </div>,
        <div className="item" data-value="3">
            <img
                src="https://media.designrush.com/articles/1628/conversions/_1523977145_341_ecommerce-details.jpg"
                alt=""
                className="home_banner"
            />
        </div>,
        <div className="item" data-value="4">
            <img
                src="https://previews.123rf.com/images/gmast3r/gmast3r1608/gmast3r160800727/61288939-online-shopping-banner-ecommerce-concept-flat-vector-illustration.jpg"
                alt=""
                className="home_banner"
            />
        </div>,
        <div className="item" data-value="5">
            <img
                src="https://www.driveresearch.com/media/4699/e-commerce-concept-shopping-online-advertisement-on-social.png"
                alt=""
                className="home_banner"
            />
        </div>,
    ];


    return (
        <div>
            <AliceCarousel
                mouseTracking
                autoPlay
                items={items}
                infinite
                name="bijay"
                animationType="fadeout"
                disableDotsControls
                // responsive={responsive}
                controlsStrategy="alternate"
                autoPlayStrategy="none"
                autoPlayInterval={1000}
                animationDuration={1000}
                touchTracking={false}
                disableButtonsControls
            />

            <div className="featured-products-container container mt-4">
                <h3>Recent Products</h3>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts?.length > 0 &&
                        lastProducts.map((product, i) => (
                            <ProductPreview {...product} key={i} />
                        ))}
                </div>

                <div>
                    <Link
                        to="/category/all"
                        style={{
                            textAlign: "right",
                            display: "block",
                            textDecoration: "none",
                        }}
                    >
                        See More
                    </Link>
                </div>
            </div>
            {/* banner */}
            <div className="sale_banner-container mt-4">
                <img
                    src="https://dsn0yv0bfu3gb.cloudfront.net/wp-content/uploads/2017/12/ecommerce-and-shopping-banner.jpg"
                    alt=""
                />
            </div>
            <div className="recent_products-container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category, i) => (
                        <LinkContainer
                            to={`/category/${category.name.toLocaleLowerCase()}`}
                            key={i}
                        >
                            <Col md={4}>
                                <div
                                    key={i}
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                                        gap: "10px",
                                    }}
                                    className="category_tile"
                                >
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Home;
