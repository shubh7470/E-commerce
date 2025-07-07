import React from "react";

const Layer = ({Head,img1,name1,img2,name2,img3,name3,img4,name4}) =>{

    return(
        <>
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <div className="card1">
      <h4 className="category-head text-center">{Head}</h4>

      <div className="category-grid">
        <div className="category-item">
          <img src={img1} alt={name1} />
          <p>{name1}</p>
        </div>
        <div className="category-item">
          <img src={img2} alt={name2} />
          <p>{name2}</p>
        </div>
        <div className="category-item">
          <img src={img3} alt={name3} />
          <p>{name3}</p>
        </div>
        <div className="category-item">
          <img src={img4} alt={name4} />
          <p>{name4}</p>
        </div>
      </div>

      <div className="category-footer">
        <a href="#" className="view-all-link">View All</a>
      </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}


export default Layer;