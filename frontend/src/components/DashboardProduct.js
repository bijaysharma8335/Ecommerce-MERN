import React from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../services/appApi";
import "./DashboardProduct.css";
import Pagination from "./Pagination";

const DashboardProduct = () => {
    const navigate=useNavigate()
    const products = useSelector((state) => state.products.data);
    const user = useSelector((state) => state.user);
    const [deleteProduct, { isLoading, isSuccess }] =
        useDeleteProductMutation();
    //function for removing the prduct
    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure?"))
            deleteProduct({ product_id: id, user_id: user._id });
            navigate('/')
    };

    function TableRow({ pictures, _id, name, price, category }) {
        return (
            <tr>
                <td>
                    <img
                        src={pictures[0].url}
                        className="dashboard-product-preview"
                        alt=""
                    />
                </td>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{category}</td>

                <td>{price}</td>
                <td>
                    {" "}
                    <Link
                        to={`/product/${_id}/edit`}
                        state={{
                            name: name,
                            pictures: pictures,
                            id: _id,
                            price: price,
                        }}
                        className="btn btn-primary me-2"
                    >
                        Edit
                    </Link>
                    <Button
                        onClick={() => handleDeleteProduct(_id, user._id)}
                        disabled={isLoading}
                        variant="danger"
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        );
    }
    return (
        <Table bordered hover responsive>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Category</th>
                    <th>Product Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <Pagination
                    data={products}
                    RenderComponent={TableRow}
                    pageLimit={1}
                    dataLimit={6}
                    tablePagination={true}
                />
            </tbody>
        </Table>
    );
};

export default DashboardProduct;
