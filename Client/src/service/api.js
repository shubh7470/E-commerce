import axios from "axios";

const URL = 'http://localhost:8000';

// Student data add karne ke liye
export const addRegistration = async (data) => {
    try {
        return await axios.post(`${URL}/register`, data);
    } catch (error) {
        console.log("Error While Connecting to add Registration", error);
    }
};

// Product insert karne ke liye
export const insertProduct = async (data) => {
    try {
        return await axios.post(`${URL}/insertproduct`, data);
    } catch (error) {
        console.log("Error While Connecting to Insert Product API", error);
    }
};

export const manageProduct = async()=>{
    try{
         return await axios.get(`${URL}/Manage`)
    }catch(error){
             console.log("Error while fetching Data",error)
    }
};
export const LogUsers = async()=>{
    try{
         return await axios.get(`${URL}/logUser`)
    }catch(error){
             console.log("Error while fetching Data",error)
    }
};

export const getSingleProduct = async (id) => {
  try {
    return await axios.get(`http://localhost:8000/product/${id}`);
  } catch (error) {
    console.log("Error while fetching single product", error);
  }
};

export const updateProduct = async (id,data) =>{
    try{
        return await axios.get(`${URL}/product/${id}`, data);
    } catch(error){
        console.log("Error while Update Product",error);
    }
};

export const deleteProduct = async (id) => {
    return await axios.delete(`${URL}/product/${id}`);
};