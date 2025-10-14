import React, { useEffect, useState } from "react";
import AdminNav from '../components/navbar';
import Sidebar from '../components/sidebar';
import { manageProduct,deleteProduct } from "../../service/api.js";
import { NavLink } from "react-router-dom";

const Manage =()=>{
    const[data,getdata] = useState([]);

    useEffect(()=>{
        getAllData()
    });

    const getAllData = async () =>{
        let response = await manageProduct()
        getdata(response.data);
    }
    const deleteButton = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await deleteProduct(id);
            alert("Product deleted successfully");
            getAllData(); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    }
};
    return(
        <>
         <AdminNav />
         <Sidebar/>
           <div className="container mt-3 me-2">
               <div className="row">
                   <div className="col-12">
                    <table className="table table-bordered w-100">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Actual Price</th>
                                <th>Discount price</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item,key)=>{
                                    return(
                                        <tr>
                                            <td>{key+=1}</td>
                                            <td>{item.pname}</td>
                                            <td>{item.category}</td>
                                            <td>{item.aprice}</td>
                                            <td>{item.dprice}</td>
                                            <td><img src={`${import.meta.env.VITE_API_URL}/uploads/${item.frontimage}`} alt="..." className="img-thumbnail" height={'50px'} width={'50px'}></img></td>
                                            <td>{item.description?.split('\n').map((line, index) => (
                                                <p key={index} className="mb-1">{line}</p>
                                                 ))}</td>
                                            <td>
                                                <NavLink to={`edit/${item._id}`}><span className="badge w-100 rounded-pill text-bg-primary">Edit</span></NavLink>
                                                <NavLink to="" onClick={() => deleteButton(`${item._id}`)}><span className="badge w-100  rounded-pill text-bg-danger">Delete</span></NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                   </div>
               </div>
           </div>
        </>
    )
}

export default Manage;