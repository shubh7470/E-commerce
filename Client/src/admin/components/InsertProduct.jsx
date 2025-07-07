import React, { useState } from 'react';
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
import { insertProduct } from '../../service/api';


const InsertProduct = () => {
    const [insert,SetInsert] = useState({
        pname:'',
        category:'',
        aprice:'',
        dprice:'',
        rating:'',
        frontimage:'',
        image1:'',
        image2:'',
        description:''

    })

    const onValueChange = (e) =>{
        SetInsert({...insert,[e.target.name] : e.target.value})
        console.log(insert)
    }

    const fileData = (e) => {
        const { name, files } = e.target;
        SetInsert((prev) => ({...prev,[name]: files[0]}));
    };
    const submitData = async (e) =>{
        e.preventDefault()
          if (!insert.pname) {
            alert('Enter product name');
           } else if (!insert.category) {
             alert('Enter category');
           } else if (!insert.aprice) {
             alert('Enter actual price');
           } else if (!insert.dprice) {
             alert('Enter discounted price');
           } else if (!insert.rating) {
             alert('Enter rating');
           } else if (!insert.frontimage) {
             alert('Upload front image');
           } else if (!insert.image1) {
             alert('Upload image 1');
           } else if (!insert.image2) {
             alert('Upload image 2');
           } else if (!insert.description) {
             alert('Enter product description');
           } else{
         const formData = new FormData()
         formData.append("frontimage", insert.frontimage,insert.frontimage.name);
         formData.append("image1", insert.image1,insert.image1.name);
         formData.append("image2", insert.image2,insert.image2.name);
         formData.append('pname', insert.pname);
         formData.append('category', insert.category);
         formData.append('aprice', insert.aprice);
         formData.append('dprice', insert.dprice);
         formData.append('rating', insert.rating);
         formData.append('description', insert.description);
         
         try{
             const res = await insertProduct(formData)
             if(res.status == 201){
                alert(res.data)

             }else{
                alert("Something went wrong")
             }

         }
         catch(error){
            console.log("Error while Inserting Data",error)
         }
  
  }
}
  return (
    <>
    <AdminNav />
           <Sidebar/>
   <div className='container-fluid'>
       <div className='row'>
           <div className='col-lg-2 col-md-2 col-sm-12'></div>
           <div className='col-lg-8 col-md-8 col-sm-12'>
               <div className='form1 p-3'>
                <h5>Insert Product</h5><hr></hr>
                    <form>
                         <div className="row">
                            <div className='col-lg-6 col-md-6 col-sm-12 mt-3'>
                                <Box sx={{ width: 500, maxWidth: '100%' }}>
                                   <TextField fullWidth type="text" name="pname" label="Product Name" onChange={onValueChange}  id="PName" />
                                </Box>

                            </div>
                             <div className='col-lg-6 col-md-6 col-sm-12 mt-3'>
                                <Box sx={{ width: 500, maxWidth: '100%' }}>
                                   <TextField fullWidth type="text" name="category" label="Category" onChange={onValueChange} id="category" />
                                </Box>

                            </div>
                             <div className='col-lg-6 col-md-6 col-sm-12 mt-3 '>
                                <FormControl fullWidth >
                                    <InputLabel htmlFor="outlined-adornment-amount">Actual Price</InputLabel>
                                        <OutlinedInput
                                                 id="Aprice"
                                                 startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                                 label="Actual Price"
                                                 name="aprice"
                                                 onChange={onValueChange}
                                         />
                                </FormControl>
   
                            </div>
                             <div className='col-lg-6 col-md-6 col-sm-12 mt-3'>
                                <FormControl fullWidth >
                                    <InputLabel htmlFor="outlined-adornment-amount">Discount Price</InputLabel>
                                        <OutlinedInput
                                                 id="Dprice"
                                                 startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                                 label="Discount Price"
                                                 name="dprice"
                                                 onChange={onValueChange}
                                         />
                                </FormControl>

                            </div>
                             <div className='col-lg-6 col-md-6 col-sm-12 mt-3'>
                                <Box sx={{ width: 500, maxWidth: '100%' }}>
                                   <TextField fullWidth type="number" name="rating" label="Rating" onChange={onValueChange} id="Rating" />
                                </Box>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 mt-3'>
                                <Box sx={{ width: 500, maxWidth: '100%' }}>
                                   <FormControl fullWidth >
                                    <InputLabel htmlFor="outlined-adornment-amount">Front Image</InputLabel>
                                        <OutlinedInput
                                                 id="frontimage"
                                                 type="file"
                                                 startAdornment={<InputAdornment position="start"></InputAdornment>}
                                                 label="Front Image"
                                                 name="frontimage"
                                                 onChange={fileData}
                                         />
                                </FormControl>
                                </Box>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 mt-3'>
                                <Box sx={{ width: 500, maxWidth: '100%' }}>
                                   <FormControl fullWidth >
                                    <InputLabel htmlFor="outlined-adornment-amount">Image 1</InputLabel>
                                        <OutlinedInput
                                                 id="image1"
                                                 type="file"
                                                 startAdornment={<InputAdornment position="start"></InputAdornment>}
                                                 label="Image 1"
                                                 name="image1"
                                                 onChange={fileData}

                                         />
                                </FormControl>
                                </Box>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 mt-3'>
                                <Box sx={{ width: 500, maxWidth: '100%' }}>
                                   <FormControl fullWidth >
                                    <InputLabel htmlFor="outlined-adornment-amount">Image 2</InputLabel>
                                        <OutlinedInput
                                                 id="Image2"
                                                 type="file"
                                                 startAdornment={<InputAdornment position="start"></InputAdornment>}
                                                 label="Image 2"
                                                 name="image2"
                                                 onChange={fileData}

                                         />
                                </FormControl>
                                </Box>

                            </div>
                            <div className='col-lg-12 col-md-12 col-sm-12 mt-3'>
                                 <Box
                                     component="form"
                                     sx={{ '& .MuiTextField-root': {  width: '99.7%' } }}
                                     noValidate
                                     autoComplete="off"
                                    >
                                    <TextField
                                        id="outlined-textarea"
                                        label="Description"
                                        name="description"
                                        onChange={onValueChange}
                                        multiline
                                     />
                                </Box>

                            </div>
                            <div className='row mt-3 ms-2'>
                                <div className='col-12'>
                                    <div style={{display:'block', float:'right'}}>
                                        <Stack direction="row" spacing={2}>
                                              <Button variant="outlined" onClick={submitData}>Submit</Button>
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
  )
}


export default InsertProduct