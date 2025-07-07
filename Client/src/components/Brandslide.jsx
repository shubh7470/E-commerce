import React from "react";
import Marquee from "react-fast-marquee";

const Brand = () => {
  return (
    <div className="mark">
      <div className="title text-center">
        <h1>Our Popular Brands</h1>
      </div>

      <Marquee speed={30} delay={0}>
        {[
          "https://images.meesho.com/images/marketing/1743159302944.webp",
          "https://images.meesho.com/images/marketing/1743159322237.webp",
          "https://images.meesho.com/images/marketing/1743159363205.webp",
          "https://images.meesho.com/images/marketing/1743159377598.webp",
          "https://images.meesho.com/images/marketing/1743159393231.webp",
          "https://images.meesho.com/images/marketing/1743159415385.webp",
          "https://images.meesho.com/images/marketing/1744636558884.webp",
          "https://images.meesho.com/images/marketing/1744636599446.webp",
          "https://images.meesho.com/images/marketing/1743159363205.webp",
          "https://images.meesho.com/images/marketing/1743159377598.webp",
        ].map((url, index) => (
          <div className="image_wrapper" key={index}>
            <img src={url} alt="Popular Brand" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brand;
