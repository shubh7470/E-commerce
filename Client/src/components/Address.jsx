import React, { useState, useEffect } from 'react';
import './css/cartpage.css';
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../Pages/footer';
import axios from 'axios';
import { TextField, Button, MenuItem, Divider } from '@mui/material';

const states = ['Uttar Pradesh', 'Delhi', 'Maharashtra', 'Bihar', 'Karnataka','West Bangal','Chhattisgarh','Madhya Pradesh','Gujarat'];

const Address = () => {
    const { state } = useLocation();
    const {
    name,
    mobile,
    totalOriginal,
    totalDiscount,
    coupon,
    platformFee,
    total
  } = state || {};
   const [formData, setFormData] = useState({
    name: name || '',
    mobile: mobile || '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    altPhone: '',
    addressType: ''
  });
  const [existingAddress, setExistingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const handleDeliverHere = () => {
  navigate('/pay', {
    state: {
      total,
      mobile
    }
  });
};

  useEffect(() => {
  const fetchAddress = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/address/${mobile}`);
      if (res.data) {
        setExistingAddress(res.data);
        setFormData({
          name: res.data.name,
          mobile: res.data.mobile,
          pincode: res.data.pincode,
          locality: res.data.locality,
          address: res.data.address,
          city: res.data.city,
          state: res.data.state,
          landmark: res.data.landmark,
          altPhone: res.data.altPhone,
          addressType: res.data.addressType
        });
      }
      else {
        setShowForm(true); 
      }
    } catch (err) {
      console.log('No saved address:', err.response?.data?.message || err.message);
      setShowForm(true);
    }
  };
  
  if (mobile) fetchAddress();
}, [mobile]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };
   const handleSubmit = async (e) => {
    e.preventDefault();
    const fullData = {
      ...formData,
      priceDetails: {
        totalOriginal,
        totalDiscount,
        coupon,
        platformFee,
        total
      }
    };
    try {
      const res = await axios.post('http://localhost:8000/address', fullData);
      alert('Order placed and address saved successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Error saving address:', err);
      alert('Failed to save address. Try again.');
    }
  };
  return (
     <>
          <Navbar />
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-12 p-3 form2">
                <h5 className='fw-bold'>Add a New Address</h5><hr></hr>

            <Divider className="mb-3" />
             {existingAddress && (
            <div className="alert alert-light border p-3 mb-4">
            <h6 className="fw-bold mb-2">Saved Address:</h6>
            <p>{existingAddress.name}, {existingAddress.mobile}</p>
            <p>{existingAddress.address}, {existingAddress.locality}</p>
            <p>{existingAddress.city}, {existingAddress.state} - {existingAddress.pincode}</p>
            <p>{existingAddress.landmark && `Landmark: ${existingAddress.landmark}`}</p>
            <p>Type: {existingAddress.addressType}</p>
            
          <div className="d-flex flex-column align-items-end gap-2">
          <Button variant="outlined" onClick={() => setExistingAddress(null)}>
           Edit Address
          </Button>
             <Button variant="outlined" size="small" onClick={() => {
              setExistingAddress(null);
              setFormData({
                     name: '',
                     mobile: mobile || '',
                     pincode: '',
                     locality: '',
                     address: '',
                     city: '',
                     state: '',
                     landmark: '',
                     altPhone: '',
                     addressType: ''
                   });
              setShowForm(true);
                }}>
           Add New Address
        </Button>
             <Button variant="contained" size="small" color="success" onClick={handleDeliverHere}>Deliver Here</Button>
          </div>
          </div>
           )}
           {!existingAddress && showForm && (
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <TextField fullWidth label="10-digit mobile number" type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <TextField fullWidth label="Pincode" type="number" name="pincode" value={formData.pincode} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <TextField fullWidth label="Locality" name="locality" value={formData.locality} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-3">
                  <TextField fullWidth label="Address (Area and Street)" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <TextField fullWidth label="City/District/Town" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <TextField
                    fullWidth
                    select
                    label="State"
                    defaultValue=""
                    name="state" value={formData.state} onChange={handleChange}
                  >
                    {states.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className="col-md-6 mb-3">
                  <TextField fullWidth label="Landmark (Optional)" name="landmark" value={formData.landmark} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <TextField fullWidth label="Alternate Phone (Optional)" type="tel" name="altPhone" value={formData.altPhone} onChange={handleChange} />
                </div>
                <div className="col-md-12 mb-3">
                  <TextField
                    select
                    fullWidth
                    label="Address Type"
                    defaultValue="Home"
                    name="addressType" value={formData.addressType} onChange={handleChange}
                  >
                    <MenuItem value="Home">Home Address</MenuItem>
                    <MenuItem value="Work">Work Address</MenuItem>
                  </TextField>
                </div>
                <div className="col-md-12">
                  <Button variant="contained" fullWidth color="primary" onClick={handleDeliverHere}>
                    Save and Deliver Here
                  </Button>
                </div>
              </div>
            </form>
              )}
            
        </div>

         <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="fw-bold mb-3">PRICE DETAILS</h6><hr></hr>
              <div className="d-flex justify-content-between">
                <p>Price</p>
                <p>₹{totalOriginal}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Discount</p>
                <p className="text-success">-₹{totalDiscount}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Coupons for you</p>
                <p className="text-success">-₹{coupon}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Platform Fee</p>
                <p>₹ {platformFee}</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <p>Total Amount</p>
                <p>₹{total}</p>
              </div>
              <p className="text-success mt-2">
                You will save ₹{totalDiscount + coupon} on this order
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='mt-4'>
    <Footer />

    </div>
        </>
  );
};

export default Address;
