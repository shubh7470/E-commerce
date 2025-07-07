import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const orders = [
  {
    id: 1,
    image: "https://via.placeholder.com/80x100",
    title: "UNICUS APPAREL Men Shrug",
    price: 788,
    status: "Cancelled",
    date: "Jun 02",
    color: "Multicolor",
    size: "L",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/80x100",
    title: "Billi KITTEN CHICKEN 500GM",
    price: 275,
    status: "Cancelled",
    date: "May 20",
    color: "N/A",
    size: "",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/80x100",
    title: "KHR Watch Strap Stainless Steel 22mm",
    price: 425,
    status: "Delivered",
    date: "May 24",
    color: "Silver",
    size: "",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/80x100",
    title: "BinkSon Replacement Strap",
    price: 300,
    status: "Cancelled",
    date: "May 18",
    color: "Black",
    size: "",
  },
];

const MyOrders = () => {
  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Filters in White Box */}
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Filters</h5>
              <hr />
              <div className="mb-3">
                <strong>ORDER STATUS</strong>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="onWay" />
                  <label className="form-check-label" htmlFor="onWay">On the way</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="delivered" />
                  <label className="form-check-label" htmlFor="delivered">Delivered</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="cancelled" />
                  <label className="form-check-label" htmlFor="cancelled">Cancelled</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="returned" />
                  <label className="form-check-label" htmlFor="returned">Returned</label>
                </div>
              </div>

              <div>
                <strong>ORDER TIME</strong>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="last30" />
                  <label className="form-check-label" htmlFor="last30">Last 30 days</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="2024" />
                  <label className="form-check-label" htmlFor="2024">2024</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="2023" />
                  <label className="form-check-label" htmlFor="2023">2023</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="input-group mb-4">
            <input type="text" className="form-control" placeholder="Search your orders here" />
            <button className="btn btn-primary">Search Orders</button>
          </div>

          {orders.map((order) => (
            <div key={order.id} className="card mb-3 shadow-sm">
              <div className="row g-0 align-items-center">
                <div className="col-md-2 text-center">
                  <img src={order.image} className="img-fluid p-2" alt="Product" />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h6 className="card-title">{order.title}</h6>
                    <p className="card-text text-muted">
                      Color: {order.color} {order.size && `| Size: ${order.size}`}
                    </p>
                    <h6 className="text-dark">₹{order.price}</h6>
                  </div>
                </div>
                <div className="col-md-4 text-end pe-4">
                  <p className={`mb-1 fw-semibold ${order.status === 'Delivered' ? 'text-success' : 'text-danger'}`}>
                    ● {order.status} on {order.date}
                  </p>
                  <button className="btn btn-link p-0 text-primary">★ Rate & Review Product</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
