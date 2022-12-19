import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../apiApi";
import Loading from "../components/Loading";
import ProductPreview from "./../components/ProductPreview";

import "./CategoryPage.css";
const CategoryPage = () => {
    const { category } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get(`/products/category/${category}`)
            .then((res) => {
                setIsLoading(false);
                setProducts(res.data);
            })
            .catch((e) => {
                setIsLoading(false);
                console.log(e.message);
            });
    }, [category]);

    if (isLoading) {
        <Loading />;
    }

    const productsSearch = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="category_page-container">
            <div
                className={`pt-3 ${category}-banner-container category-banner-container`}
            >
                <h1 className="text-center">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </h1>
            </div>
            <div className="filters_container d-flex justify-content-center pt-4 pb-4">
                <input
                    type="search"
                    placeholder="search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {productsSearch.length === 0 ? (
                <h1> No products to show</h1>
            ) : (
                <Container>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <div
                                className="
                          d-flex justify-content-center align-items-center flex-wrap"
                            >
                                {productsSearch.map((product, i) => (
                                    <ProductPreview {...product} key={i} />
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default CategoryPage;
