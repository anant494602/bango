import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import ShowCartImage from './ShowCartImage';
import Checkout from './Checkout';
import LeftPanelCustomerComponent from '../utils/LeftPanelCustomerComponent';
import {useSelector} from 'react-redux';
import { addItem, updateItem, removeItem } from './cartHelpers';
import '../core/coreStyle/cartComponent.css';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);
    const _id = useSelector(state => state.SearchReducer.UserId)

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
             <h4>Your cart summary</h4>

             <h6 className="mb-4">Your cart has {`${items.length}`} items</h6>

             <table class="table table-dark">
                    <thead>
                      <tr>
                        <th scope="col">Name Of Product</th>
                        <th scope="col">Product Detail</th>
                        <th scope="col">Item Quantity</th>
                        <th scope="col">Remove</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {items.map((product, i) => {
                        {console.log(product)}
                        return (
                          <tr>
                            <td>{product.name}</td>
                            <td><ShowCartImage item={product} url="product" /></td>
                            <td>{product.count}</td>
                            <td>
                                <button onClick={() => {
                                        removeItem(product._id);
                                        setRun(!run); 
                                      }} type="button" class="close button-remove" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                            </td>
                            <td>{product.price}</td>
                          </tr>
                        )
                    })}
                    
                    </tbody>
               </table>
              
                {/* {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))} */}
            </div>
        );
    };

    const noItemsMessage = () => (
            <h4>Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link></h4>
   
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid"
        >
            {/* <div className="row">
                <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-6">
                    <h2 className="mb-4">Your cart summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div> */}
          <div className="row">
          <div className="col-3">
           <LeftPanelCustomerComponent user={_id}/>
           </div>
      <div className="col-9 bango-cart">
        <div className="row">
          <div className="col-md-8">
            <h2>Shopping cart</h2>
            <div>{items.length > 0 ? showItems(items) : noItemsMessage()}</div>             

          </div>
          <div className="col-md-4 payment-info">
            <div>
              <div className="d-flex justify-content-between align-items-center"><span>Card details</span></div><span className="type d-block mt-3 mb-1">Card type</span><label className="radio"> <input type="radio" name="card" defaultValue="payment" defaultChecked /> <span><img width={30} src="https://img.icons8.com/color/48/000000/mastercard.png" /></span> </label>
              <label className="radio"> <input type="radio" name="card" defaultValue="payment" /> <span><img width={30} src="https://img.icons8.com/officel/48/000000/visa.png" /></span> </label>
              <label className="radio"> <input type="radio" name="card" defaultValue="payment" /> <span><img width={30} src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span> </label>
              <label className="radio"> <input type="radio" name="card" defaultValue="payment" /> <span><img width={30} src="https://img.icons8.com/officel/48/000000/paypal.png" /></span> </label>
              <div><label className="credit-card-label">Name on card</label><input type="text" className="form-control credit-inputs" placeholder="Name" /></div>
              <div><label className="credit-card-label">Card number</label><input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" /></div>
              <div className="row">
                <div className="col-md-6"><label className="credit-card-label">Date</label><input type="text" className="form-control credit-inputs" placeholder="12/24" /></div>
                <div className="col-md-6"><label className="credit-card-label">CVV</label><input type="text" className="form-control credit-inputs" placeholder={342} /></div>
              </div>
              <hr className="line" />
              <div className="d-flex justify-content-between information"><span>Subtotal</span><span>Rs 3000.00</span></div>
              <div className="d-flex justify-content-between information"><span>Shipping</span><span>Rs 20.00</span></div>
              <div className="d-flex justify-content-between information"><span>Total(Incl. taxes)</span><span>Rs 3020.00</span></div>
              <button className="btn btn-site-button">Checkout</button>
            </div>
          </div>
          </div>
      </div>
      </div>
        </Layout>
    );
};

export default Cart;
