import React from 'react';
import './App.css'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Books from './components/Books';
import Fashion from './components/Fashion';
import Electronics from './components/Electronics';
import Home from './Pages/Home';
import Login from './Pages/login';
import Register from './Pages/Registration.jsx';
import Cart from './components/CartPage';
import AdminHome from './admin/Pages/Home.jsx';
import ProductDetail from './components/Productdetails.jsx';
import InsertProduct from './admin/components/InsertProduct.jsx';
import ManageProduct from './admin/components/Manageproduct.jsx';
import AdminLogin from './admin/Pages/login.jsx';
import Address from './components/Address.jsx';
import Pay from './components/Pay.jsx';
import LogUser from './admin/components/LogUser.jsx';
import Dashboard from './admin/components/Dashboard.jsx';
import Track from './components/Track.jsx';
import Edit from './admin/components/Edit.jsx';

function App() {
  return (
    <>
     <Router>
     

      {/* Page Routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
         <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/track" element = {<Track />} />
        <Route path='/Books' element={<Books />} />
        <Route path='/fashion' element={<Fashion />} />
        <Route path='/electronics' element={<Electronics />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/Address' element={<Address />} />
        <Route path="/pay" element={<Pay />} />
{/* Admin ka Router */}
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/adhome' element={<AdminHome/>}  />
        <Route path='/Insert' element={<InsertProduct />} />
        <Route path='/Manage' element={<ManageProduct />} />
        <Route path='/admin/user' element={<LogUser />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/Manage/edit/:id' element={<Edit />} />






        


      </Routes>
    </Router>
    <div>
    </div>
  

    </>
  )
}


export default App
