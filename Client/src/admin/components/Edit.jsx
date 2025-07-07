import React, { useEffect, useState } from 'react';
import AdminNav from '../components/navbar';
import Sidebar from '../components/sidebar';
import './CSS/insertpro.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProduct, updateProduct } from '../../service/api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    pname: '',
    category: '',
    aprice: '',
    dprice: '',
    rating: '',
    description: '',
    frontimage: null,
    image1: null,
    image2: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSingleProduct(id);
        setEditData(res.data);
      } catch (err) {
        console.log("Error fetching product", err);
      }
    };
    fetchData();
  }, [id]);

  const onValueChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const fileData = (e) => {
    const { name, files } = e.target;
    setEditData({ ...editData, [name]: files[0] });
  };

//   const updateData = async (e) => {
//     e.preventDefault();
     
//     const formData = new FormData();
//     formData.append('pname', editData.pname);
//     formData.append('category', editData.category);
//     formData.append('aprice', editData.aprice);
//     formData.append('dprice', editData.dprice);
//     formData.append('rating', editData.rating);
//     formData.append('description', editData.description);

//     if (editData.frontimage instanceof File) {
//       formData.append('frontimage', editData.frontimage, editData.frontimage.name);
//     }

//     if (editData.image1 instanceof File) {
//       formData.append('image1', editData.image1, editData.image1.name);
//     }

//     if (editData.image2 instanceof File) {
//       formData.append('image2', editData.image2, editData.image2.name);
//     }

//     try {
//       const res = await updateProduct(id, formData);
//       if (res.status === 200) {
//         alert("Product updated successfully");
//         navigate('/Manage');
//       } else {
//         alert("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Update error", error);
//     }
//   };
const updateData = async (e) => {
  e.preventDefault();
  try {
    const updateFields = {
      pname: editData.pname,
      category: editData.category,
      aprice: editData.aprice,
      dprice: editData.dprice,
      rating: editData.rating,
      description: editData.description,
    };

    const res = await updateProduct(id, updateFields); // not FormData
    if (res.status === 200) {
      alert("Product updated successfully");
      navigate('/manage');
    } else {
      alert("Something went wrong");
    }
  } catch (err) {
    console.error("Update error", err);
  }
};


  return (
    <>
      <AdminNav />
      <Sidebar />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2'></div>
          <div className='col-lg-8'>
            <div className='form1 p-3'>
              <h5>Edit Product</h5><hr />
              <form>
                <div className="row">
                  <div className='col-lg-6 mt-3'>
                    <TextField fullWidth type="text" name="pname" label="Product Name" value={editData.pname} onChange={onValueChange} />
                  </div>
                  <div className='col-lg-6 mt-3'>
                    <TextField fullWidth type="text" name="category" label="Category" value={editData.category} onChange={onValueChange} />
                  </div>
                  <div className='col-lg-6 mt-3'>
                    <FormControl fullWidth>
                      <InputLabel>Actual Price</InputLabel>
                      <OutlinedInput
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                        label="Actual Price"
                        name="aprice"
                        value={editData.aprice}
                        onChange={onValueChange}
                      />
                    </FormControl>
                  </div>
                  <div className='col-lg-6 mt-3'>
                    <FormControl fullWidth>
                      <InputLabel>Discount Price</InputLabel>
                      <OutlinedInput
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                        label="Discount Price"
                        name="dprice"
                        value={editData.dprice}
                        onChange={onValueChange}
                      />
                    </FormControl>
                  </div>
                  <div className='col-lg-6 mt-3'>
                    <TextField fullWidth type="number" name="rating" label="Rating" value={editData.rating} onChange={onValueChange} />
                  </div>
                  <div className='col-lg-6 mt-3'>
                    <FormControl fullWidth>
                      <InputLabel shrink>Front Image</InputLabel>
                      <OutlinedInput
                        type="file"
                        name="frontimage"
                        onChange={fileData}
                      />
                    </FormControl>
                  </div>
                  <div className='col-lg-6 mt-3'>
                    <FormControl fullWidth>
                      <InputLabel shrink>Image 1</InputLabel>
                      <OutlinedInput
                        type="file"
                        name="image1"
                        onChange={fileData}
                      />
                    </FormControl>
                  </div>
                  <div className='col-lg-6 mt-3'>
                    <FormControl fullWidth>
                      <InputLabel shrink>Image 2</InputLabel>
                      <OutlinedInput
                        type="file"
                        name="image2"
                        onChange={fileData}
                      />
                    </FormControl>
                  </div>
                  <div className='col-lg-12 mt-3'>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      name="description"
                      label="Description"
                      value={editData.description}
                      onChange={onValueChange}
                    />
                  </div>
                  <div className='row mt-3 ms-2'>
                    <div className='col-12'>
                      <div style={{ float: 'right' }}>
                        <Stack direction="row" spacing={2}>
                          <Button variant="outlined" onClick={updateData}>Update</Button>
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
