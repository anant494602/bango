import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ height: "250px" ,width:'100%' , backgroundSize: 'cover'}}
        />
    </div>
);

export default ShowImage;
