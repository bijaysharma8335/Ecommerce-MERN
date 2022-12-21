import React from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProduct.css";
const DashboardProduct = () => {
    const products = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    const [deleteProduct, { isLoading, isSuccess }] =
        useDeleteProductMutation();
    //function for removing the prduct
    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure?"))
            deleteProduct({ product_id: id, user_id: user.id });
    };
    return (
        <Table striped bordered hovered responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 &&
                    products.map((product) => (
                        <tr>
                            <td>
                                <img
                                    src={product.pictures[0].url}
                                    alt=""
                                    className="dashboard-product-preview"
                                />
                            </td>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button
                                    onClick={() =>
                                        handleDeleteProduct(
                                            product._id,
                                            user._id
                                        )
                                    }
                                    variant="danger"
                                    disabled={isLoading}
                                >
                                    Delete
                                </Button>
                                <Link
                                    to={`/products/${product._id}/edit`}
                                    className="btn btn-warning"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
};

export default DashboardProduct;
