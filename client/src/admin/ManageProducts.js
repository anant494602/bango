import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import LeftPanelComponent from "../utils/LeftPanelComponent";
import LoaderComponent from '../utils/LoadingComponent';
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setloader] = useState(false);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        setloader(true);
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
                setloader(false);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);



    return (
        <>
     
       <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            
            <div className="row">
                <div className="col-3"><LeftPanelComponent /></div>
                <div className="col-9">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    {loading ? <LoaderComponent /> : null}
                    <table class="table table-striped table-dark">
                        <thead>
                            <tr>
                            <th scope="col">Seriel No </th>
                            <th scope="col">Priduct Name</th>
                            <th scope="col">Product category</th>
                            <th scope="col">Update Product</th>
                            <th scope="col">Delete Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(products)}
                        {products.map((p, i) => (
                            <tr key ={i+1}>
                            <th scope="row">{i+1}</th>
                            <td>{p.name}</td>
                            <td>{p.category ? p.category.name : ''}</td>
                            <td> <button className="input-group-text btn search-button" type="submit">  <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Edit
                                    </span>
                                </Link></button></td>
                            <td> <button className="input-group-text btn search-button" onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                type="button">Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
                    {/* <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                    className="badge badge-danger badge-pill"
                                >
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul> */}
                    <br />
                </div>
            </div>
        </Layout>
        </>
    );
};

export default ManageProducts;
