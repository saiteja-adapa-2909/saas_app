import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../../Middleware";
// import CreateProduct from "../CreateProduct";
import "./index.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getDesignerData,
  getDesignerProducts,
} from "../../reduxstore/dataslice";

const ProductsPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Use the middleware function to check the token
    const isAuthenticated = checkToken();
    if (!isAuthenticated) {
      // Redirect or handle unauthorized access
      // For example, redirect to the login page
      console.log("not authenticated");
      navigate("/");
    } else {
      console.log("User authenticated");
    }
  }, []);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const designerdata = useSelector((state) => state.app.designer);
  const products = useSelector((state) => state.app.products);
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Dispatching getDesignerData");
    dispatch(getDesignerData());
    dispatch(getDesignerProducts());
  }, [dispatch]);

  console.log(designerdata, "in products page lol");
  console.log(products, "products products page lol");

  const handleAddNew = () => {
    navigate("/home/createproduct");
  };

  return (
    <div>
      <div className="d-flex flex-row ">
        <div className="dashboard-header">
          <h1 className="head-style">
            Products ({loading ? "Loading..." : products.length})
          </h1>
          <p>Manage products for your store</p>
        </div>
        <div className="d-flex flex-column justify-content-center add-button-style">
          <button
            type="button"
            className="btn btn-dark text-light border-0 cp-button-style"
            onClick={handleAddNew}
          >
            + Add New
          </button>
        </div>
      </div>
      <hr className="hr-style" />
      <div>
        <div className="d-flex">
          <input
            className="form-control search-button-style me-2"
            type="search"
            placeholder="Search products"
            aria-label="Search"
          />
        </div>
      </div>
      <div>
        {loading ? (
          <p className="text-center text-states">Loading products...</p>
        ) : (
          <>
            {products.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Archived</th>
                    <th>Product ID</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.product_id}>
                      <td>
                        <img
                          src={product.product_image}
                          alt={`sample_${product.product_id}`}
                          width="60"
                          height="60"
                        />
                      </td>
                      <td>{product.product_name}</td>
                      <td>{product.product_category}</td>
                      <td>{product.product_price}</td>
                      <td>{product.product_date.substring(0, 10)}</td>
                      <td>{product.product_archive}</td>
                      <td>{product.product_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-states">No products available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
