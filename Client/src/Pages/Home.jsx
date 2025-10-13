import React from "react";
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Layer1 from '../Category/layer';
import Men from '../assets/category/men.jpg';
import Women from '../assets/category/women.jpg';
import Shoes from '../assets/category/shoes.jpg';
import Access from '../assets/category/accessiores.jpg';
import Mobile from '../assets/category/Mobile.jpg';
import Laptop from '../assets/category/Laptop.jpg';
import Headp from '../assets/category/Headphones.jpg';
import Play from '../assets/category/Playstation.jpg';
import Furniture from '../assets/category/Furniture.jpg';
import Decor from '../assets/category/home-decor.jpg';
import Large from '../assets/category/home-appliances.jpg';
import kit from '../assets/category/kitchen-dining.jpg';
import Meng from '../assets/category/Meng.jpg';
import Per from '../assets/category/Per.jpg';
import Baby from '../assets/category/Baby.jpg';
import Make from '../assets/category/Make.jpg';
import Brand from '../components/Brandslide';
import Product from '../components/Product';
import Small from '../Category/small';
import Footer from '../Pages/footer';

const Home = () =>{
    return(
        <>
            <div>
                <div><Navbar /></div>
                <div><Slider /></div>
                <div className="title text-center">
                    <h3>Top Category</h3>
                </div>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12 p-0 m-0">
                            <Layer1
                            Head='Fashion'
                            img1 = {Men}
                            name1 = 'Men'
                            img2 = {Women}
                            name2 = 'Women'
                            img3 = {Shoes}
                            name3 = 'Shoes'
                            img4={Access}
                            name4 = 'Accessiories'
                              />
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 p-0 m-0">
                            <Layer1
                            Head='Electronics'
                            img1 = {Mobile}
                            name1 = 'Smartphones'
                            img2 = {Laptop}
                            name2 = 'Laptop'
                            img3 = {Headp}
                            name3 = 'HeadPhones'
                            img4={Play}
                            name4 = 'Playstation' />
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 p-0 m-0">
                            <Layer1 
                                Head='Home & Kitchen'
                            img1 = {Furniture}
                            name1 = 'Furniture'
                            img2 = {Decor}
                            name2 = 'Home Decoration'
                            img3 = {Large}
                            name3 = 'Large Appliance'
                            img4={kit}
                            name4 = 'Kitchen & Dining'
                            />
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 p-0 m-0">
                            <Layer1 
                                Head='Beauty & Personal Care'
                            img1 = {Meng}
                            name1 = 'Mens Groming'
                            img2 = {Baby}
                            name2 = 'Baby Care'
                            img3 = {Make}
                            name3 = 'MakeUp Kit'
                            img4={Per}
                            name4 = 'Peronal Hygiene'
                            />
                        </div>
                    </div>
                </div>

                <div><Brand /></div>
                <div className='title text-center my-4'>
        <h1>Product For You</h1>
      </div>
      <div className='container mb-5'>
        <Product />
      </div>
                
  <div><Small /></div>
  <div><Footer/></div>
            </div>
        </>
    )
}

export default Home