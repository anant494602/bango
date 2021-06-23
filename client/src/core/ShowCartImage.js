import React from "react";
import { API } from "../config";

const ShowCartImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3 image-thumbnail"
            style={{ height: "100px" ,width:'150' , backgroundSize: 'cover'}}
        />
    </div>
);

export default ShowCartImage;