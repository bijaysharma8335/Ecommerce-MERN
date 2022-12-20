import React from "react";
import "./CartPage.css";
import { useSelector } from "react-redux";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle, FaTimes } from "react-icons/fa";
const CartPage = () => {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products.data);
    console.log(products);
    const userCartObj = user.cart;

    let cart = products.filter((product) => userCartObj[product._id] !== null);
    return (
        <Container style={{ minHeight: "95vh" }} className="cart_container">
            <Row>
                <Col md={7}>
                    <h1 className="pt-2 ">Shopping Cart</h1>
                    {cart.length === 0 ? (
                        <Alert variant="info">
                            Shopping Cart is empty.Please add products to your
                            cart
                        </Alert>
                    ) : (
                        <div>Click Here</div>
                    )}
                </Col>
                <Col md={5}>
                    {cart.length > 0 && (
                        <>
                            <Table responsive="sm" className="cart-table">
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>SubTotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, i) => (
                                        <tr>
                                            <td>&nbsp;</td>
                                            <td>
                                                <FaTimes
                                                    style={{
                                                        marginRight: "10",
                                                        marginLeft: "10",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                                <img
                                                    src={item.pictures[0].url}
                                                    alt=""
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </td>
                                            <td>${item.price}</td>
                                            <td>
                                                <span className="quantity-indicator">
                                                    <FaMinusCircle />
                                                    <FaPlusCircle />
                                                </span>
                                            </td>
                                            <td>
                                                $
                                                {item.price *
                                                    user.cart[item._id]}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div>
                                <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
