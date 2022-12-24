import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import axios from "../apiApi";
import Loading from "./Loading";
import Pagination from "./Pagination";

const OrdersAdminPage = () => {
    const products = useSelector((state) => state.products.data);

    const [orders, setorders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [orderToShow, setOrderToShow] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/orders")
            .then((res) => {
                setLoading(false);
                setorders(res.data);
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

    function TableRow({ _id, count, owner, total, status, products, address }) {
        return (
            <tr>
                <td>{_id}</td>
                <td>{owner?.name}</td>
                <td>{count}</td>
                <td>{total}</td>
                <td>{address}</td>
                <td>
                    {status === "processing" ? (
                        <Button
                            size="sm"
                            onClick={() => markShipped(_id, owner?._id)}
                        >
                            marked as Shipped
                        </Button>
                    ) : (
                        <Badge bg="success">Shipped</Badge>
                    )}
                </td>

                <td>
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => showOrder(products)}
                    >
                        View Order
                        <FaEye  className="mx-2"/>
                    </span>
                </td>
            </tr>
        );
    }
    return (
        <>
            <Table responsive bordered hover>
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
                    <Pagination
                        data={orders}
                        RenderComponent={TableRow}
                        pageLimit={1}
                        dataLimit={10}
                        tablePagination={true}
                    />
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {orderToShow.length > 0 &&
                        orderToShow.map((order, i) => (
                            <div
                                className="order_details-container d-flex justify-content-space-between py-2"
                                key={i}
                            >
                                <img
                                    src={order.pictures[0].url}
                                    style={{
                                        maxWidth: 100,
                                        height: 100,
                                        objectFit: "cover",
                                    }}
                                    alt=""
                                    className="me-3"
                                />
                                <h4>
                                    <span className="ms-2">
                                        {order.count} x
                                        <span className="mx-2">
                                            {order.name}
                                        </span>
                                    </span>
                                </h4>
                                <h4>
                                    Price: ${Number(order.price) * order.count}
                                </h4>
                            </div>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default OrdersAdminPage;
