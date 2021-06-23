import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import '../core/coreStyle/cardComponent.css';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button type="button" className="btn  btn-success  btn-block ">View Details</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(false));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
       <button type="button" onClick={addToCart} className="btn  btn-success  btn-block ">Add to Cart</button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    // <div className="card ">
    //   <div className="card-header card-header-1 ">{product.name}</div>
    //   <div className="card-body">
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url="product" />
    //     <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
    //     <p className="card-p black-10">$ {product.price}</p>
    //     <p className="black-9">Category: {product.category && product.category.name}</p>
    //     <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
    //     {showStock(product.quantity)}
    //     <br />

    //     {showViewButton(showViewProductButton)}

    //     {showAddToCartBtn(showAddToCartButton)}

    //     {showRemoveButton(showRemoveProductButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>

        <div className="card">
          <div className="card-header card-header-1 ">{product.name}</div>
          <div className="card-body pt-0 px-0">
           {shouldRedirect(redirect)}
           <ShowImage item={product} url="product" />
           <hr className="mt-0 mx-3" />
            <div className="d-flex flex-row justify-content-between mb-0 px-3"> <small className="text-muted mt-1">{('description' in product )? product.description.substring(0, 100): null}</small>
              <h6></h6>
            </div>
            <hr className="mt-1 mx-3" />
            <div className="d-flex flex-row justify-content-between px-3">
              <div className="d-flex flex-column"><span className="text-muted">Price</span><small className="text-muted">{`Rs ${product.price}`}</small></div>
            </div>
            <hr className="mt-1 mx-3" />
            <div className="d-flex flex-row justify-content-between px-3">
              <div className="d-flex flex-column">
              <p className="black-9">Category: {product.category && product.category.name}</p>
              </div>
            </div> 

           
            <hr className="mt-1 mx-3" />
            <div className="mt-1 mx-3">  
            {showStock(product.quantity)}
            </div>
            <hr className="mt-2 mx-3" />

            <div className="mt-1 mx-3">         
                {showRemoveButton(showRemoveProductButton)}
                {showCartUpdateOptions(cartUpdate)}
                {showViewButton(showViewProductButton)}

                {showAddToCartBtn(showAddToCartButton)}
            </div>
           
          </div>
        </div>

  );
};

export default Card;
