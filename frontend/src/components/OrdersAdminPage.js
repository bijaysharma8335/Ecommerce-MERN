import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import FaEye from "react-icons/fa";
import axios from "../apiApi";
import Loading from "./Loading";

const OrdersAdminPage = () => {
    const products = useSelector((state) => state.products);
    const [orders, setorders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [orderToShow, setOrderToShow] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/orders")
            .then((data) => {
                setLoading(false);
                setorders(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);
    const handleClose = () => setShow(false);

    const markShipped = (orderId, ownerId) => {
        axios
            .patch(`/orders/${orderId}/mark-shipped`, { ownerId })
            .then((res) => setorders(res.data))
            .catch((e) => console.log(e));
    };

    const showOrder = (productsObj) => {
        let productsToShow = products.filter(
            (product) => productsObj[product._id]
        );

        productsToShow = productsToShow.map((product) => {
            const productCopy = { ...product };
            productCopy.count = productsObj[product._id];
            delete productCopy.description;
            return productCopy;
        });
        setShow(true);
        setOrderToShow(productsToShow);
    };
    if (loading) {
        return <Loading />;
    }

    if (orders.length === 0) {
        return <h1 className="text-center pt-4">No orders yet</h1>;
    }
    return (
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Items</th>

                        <th>Order Total</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 &&
                        orders.map((order, i) => (
                            <tr key={i}>
                                <td>{order._id}</td>
                                <td>{order.owner?.name}</td>
                                <td>{order.count}</td>
                                <td>${order.total}</td>
                                <td>{order.address}</td>
                                <td>
                                    {order.status === "processing" ? (
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                markShipped(
                                                    order._id,
                                                    order.owner?._id
                                                )
                                            }
                                        >
                                            marked as Shipped
                                        </Button>
                                    ) : (
                                        <Badge bg="success">Shipped</Badge>
                                    )}
                                </td>

                                <td>
                                    <span style={{ cursor: "pointer" }}>
                                        View Order
                                        <FaEye
                                            onClick={() => showOrder(products)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
            </Modal>
        </>
    );
};

export default OrdersAdminPage;
