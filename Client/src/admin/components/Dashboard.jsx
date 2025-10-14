import React, { useEffect, useState } from 'react';
import AdminNav from '../components/navbar';
import Sidebar from '../components/sidebar';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
  totalOrders: 0,
  confirmedOrders: 0,
  activeUsers: 0,
  totalProducts: 0,
  productsSold: 0,
  });

  useEffect(() => {
  const fetchStats = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/order/stats`);
    setStats(res.data);
  };
  fetchStats();
}, []);
const [revenue, setRevenue] = useState(0);
 useEffect(() => {
    const fetchRevenue = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/order/revenue`);
      setRevenue(res.data.totalRevenue || 0); 
    };
    fetchRevenue();
  }, []);
  return (
    <>
    <AdminNav />
         <Sidebar/>
    <div className="container mt-5 me-2">
      <h3 className="mb-4 fw-bold">📊 Admin Dashboard</h3>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <h2>{stats.totalOrders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Total Active Users</h5>
              <h2>{stats.activeUsers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <h2>{stats.totalProducts}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-bg-info h-100">
            <div className="card-body">
              <h5 className="card-title">Total Products Solds</h5>
              <h2>{stats.productsSold}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-bg-secondary h-100">
            <div className="card-body">
              <h5 className="card-title">Sales Profit</h5>
              <h2><span style={{ fontSize: "30px" }}>₹ </span>{revenue}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
