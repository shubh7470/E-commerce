import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { Navbar, Container, Form, FormControl, Button, Nav } from 'react-bootstrap';

import logo from '../assets/logo/logo.png'
import '../index.css';
import { FiAlignJustify } from "react-icons/fi";

const Header = () => {
   const[user, setUser] = useState(null);
   const navigate = useNavigate();
   const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  // Example: Get cart items from localStorage or API
  const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  setCartCount(storedCart.length);
}, []);

   useEffect(()=>{
    const userData = localStorage.getItem("user");
    const parsedUser = JSON.parse(userData);
   if (parsedUser && parsedUser.name) {
    setUser(parsedUser);
   }

   },[]);
   const handleLogout = () =>{
    localStorage.removeItem("user");
    localStorage.removeItem("SelectProduct");
    setUser(null);
    navigate("/");
   }
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Left: Logo */}
<img src={logo} alt={'logo'} height={'60px'} width={'150px'}></img> 
        {/* Center: Search bar and button */}
        <Form className="d-flex mx-auto" style={{ maxWidth: '500px', flex: 1 }}>
          <FormControl
            type="search"
            placeholder="Search products..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-primary">Search</Button>
        </Form>

        {/* Right: Icons */}
        <Nav>
  <Nav.Link href="#">
    <span role="img" aria-label="like" style={{ fontSize: "24px" }}>❤️</span>
  </Nav.Link>
  <Nav.Link href="#" className="position-relative">
  <span role="img" aria-label="cart" style={{ fontSize: "24px" }}>🛒</span>
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {cartCount}
  </span>
</Nav.Link>

</Nav>

        
      </Container>
      
    </Navbar>
    <div className="custom-navbar">
      <div className="left">
        <NavLink to="/" className="nav-link nav-category">
          <FiAlignJustify size={18} /> <span>Category</span>
        </NavLink>
      </div>

      <div className="center">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/fashion" className="nav-link">Fashion</NavLink>
        <NavLink to="/electronics" className="nav-link">Electronics</NavLink>
        <NavLink to="/Books" className="nav-link">Books</NavLink>
        <NavLink to="/kitchen" className="nav-link">Home & Kitchen</NavLink>
      </div>

      <div className="right">
     {user ? (
            <>
              <span style={{ color: 'white', marginRight: '10px' }}>
                Welcome, <strong>{user.name}</strong>
              </span>
              <NavLink onClick={handleLogout} className="nav-link login-link" style={{ padding: '5px 10px' }}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              
        <NavLink to="/login" className="nav-link login-link">Login / Register</NavLink>

              
            </>
          )}
      </div>
    </div>
    
</>
    
  );
}

export default Header;
