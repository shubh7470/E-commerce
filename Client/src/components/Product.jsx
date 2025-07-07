import React, { useState,useEffect } from "react";
import productData from "./Example.json";
import {Link} from "react-router-dom";
import { manageProduct } from "../service/api.js";


const Product = () => {
 const[data,getdata] = useState([]);
 
     useEffect(()=>{
         getAllData()
     });
 
     const getAllData = async () =>{
         let response = await manageProduct()
         getdata(response.data);
     }

  return (
    <div className="row">
      {data.map((item,index) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
  <div className="card2 p-3 h-100 d-flex flex-column justify-content-between">
    
    <div className="img mb-2" style={{ width: "100%", height: "300px", overflow: "hidden" }}>
      <img
        src={`http://localhost:8000/uploads/${item.frontimage}`}
        alt={item.frontimage}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>

    <Link to={`/product/${item._id}`} className="product-text">
      <h5>{item.pname}</h5>
    </Link>

    <div className="mt-2">
      <p className="mb-1">
        <strong>Price:</strong> ₹{item.dprice}
        <span style={{ color: 'red', textDecoration: 'line-through', marginLeft: '7px' }}>
          ₹{item.aprice}
        </span>
      </p>
      <p className="mb-1"><strong>Rating:</strong> ⭐ {item.rating}</p>
    </div>

    <div className="mt-auto d-grid d-md-flex justify-content-md-end">
     <Link to={`/product/${item._id}`} className="product-text">
      <button className="btn btn-primary me-md-2" type="button">Details</button>
      </Link>
    </div>
  </div>
</div>

      ))}
    </div>
  );
};

export default Product;
