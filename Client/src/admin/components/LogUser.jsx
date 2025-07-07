import React, { useEffect, useState } from "react";
import AdminNav from '../components/navbar';
import Sidebar from '../components/sidebar';
import { LogUsers } from "../../service/api.js";
import { NavLink } from "react-router-dom";

const LogUser = () =>{
    
    const[data,getdata] = useState([]);

    useEffect(()=>{
        getAllData()
    });

    const getAllData = async () =>{
        let response = await LogUsers()
        getdata(response.data);
    }
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
                                <th> Name</th>
                                <th>Mobile</th>
                                
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item,key)=>{
                                    return(
                                        <tr>
                                            <td>{key+=1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.mobile}</td>
                                            
                                            <td>
                                                <NavLink to={`edit/${item._id}`}><span className="badge rounded-pill text-bg-primary">Verify</span></NavLink>
                                                <NavLink to="" onClick={() => deleteButton(`${item._id}`)}><span className="badge rounded-pill text-bg-danger" style={{marginLeft:'10px'}}>Delete</span></NavLink>
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

export default LogUser;