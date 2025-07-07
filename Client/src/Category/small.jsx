import React from "react";
import { FaShippingFast, FaUndo, FaLock, FaGift, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast size={32} />,
    title: "Free Shipping",
    desc: "For all Orders Over ₹100"
  },
  {
    icon: <FaUndo size={32} />,
    title: "30 Days Returns",
    desc: "For an Exchange Product"
  },
  {
    icon: <FaLock size={32} />,
    title: "Secured Payment",
    desc: "Payment Cards Accepted"
  },
  {
    icon: <FaGift size={32} />,
    title: "Special Gifts",
    desc: "Our First Product Order"
  },
  {
    icon: <FaHeadset size={32} />,
    title: "Support 24/7",
    desc: "Contact us Anytime"
  }
];

const Features = () => {
  return (
    <div className="container my-5">
      <div className="row text-center bd">
        {features.map((item, index) => (
          <div className="col-lg-2 col-md-4 col-sm-6 mb-4 mx-auto" key={index}>
            <div className="p-3">
              <div className="mb-2 text-primary">{item.icon}</div>
              <h6 className="fw-bold">{item.title}</h6>
              <p className="text-muted small">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
