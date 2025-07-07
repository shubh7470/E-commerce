import React, { useEffect, useState } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../Pages/footer';
import Product from '../components/Product';

import { getSingleProduct } from "../service/api.js";
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();  // URL se id mil raha
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSingleProduct(id);
      setProduct(res?.data);
      setSelectedImage(res?.data.frontimage);
    };
    fetchData();
  }, [id]);

  if (!product) return <h3>Loading...</h3>;

  const handleBuyNow = () =>{
    const user = JSON.parse(localStorage.getItem("user"));

    const selectedProduct = {
    id: product._id,
    pname: product.pname,
    dprice: product.dprice,
    aprice:product.aprice,
    image: product.frontimage,
    quantity: 1
  };
  localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));

  
  
  if (user && user.token) {
    // ✅ Store in DB
    axios.post('http://localhost:8000/cart/add', {
      mobile: user.mobile,
      name: user.name,
      product: selectedProduct
    }).then(() => {
      // 🧹 Remove from localStorage
      localStorage.removeItem('selectedProduct');
      navigate("/cart");
    });
  } else {
    // ❌ Not logged in, temporarily save
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    navigate("/login", { state: { from: "/cart",selectedProduct } });
  }
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Left: Images */}
          <div className="col-md-6">
            <div className="d-flex flex-column align-items-start">
              <img
                src={`http://localhost:8000/uploads/${selectedImage}`}
                alt="product"
                className="img-fluid mb-3"
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "700px",
                  // objectFit: "cover"
                }}
              />
              <div className="d-flex gap-2">
                {[product.frontimage, product.image1, product.image2].map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:8000/uploads/${img}`}
                    alt={`thumbnail-${idx}`}
                    width="60"
                    height="60"
                    onClick={() => setSelectedImage(img)}
                    style={{
                      cursor: "pointer",
                      border: selectedImage === img ? "2px solid blue" : "1px solid #ccc",
                      borderRadius: "4px"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Right: Details */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4>{product.pname}</h4>
                <h5 className="text-danger">
                  ₹{product.dprice}
                  <span style={{ color: 'red', textDecoration: 'line-through', marginLeft: '7px' }}>
                   <span style={{"fontSize":"15px"}}>₹{product.aprice}</span> 
                  </span>
                </h5>
                <div className="badge bg-success mb-2">⭐ {product.rating}</div>
                <p><strong>Free Delivery</strong></p>

              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="fw-bold">Product Details</h5>
                {product.description?.split('\n').map((line, index) => (
                  <p key={index} className="mb-1">{line}</p>
                ))}
              </div>
            </div>

            <div className="d-flex gap-3 mt-4">
              <button onClick={handleBuyNow} className="btn btn-outline-primary flex-fill">🛒 Add to Cart</button>
              <button onClick={handleBuyNow} className="btn btn-primary flex-fill">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className='title text-center my-4'>
              <h1>Product For You</h1>
            </div>
            <div className='container mb-5'>
              <Product />
            </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
