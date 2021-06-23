import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Divider } from 'semantic-ui-react'
import { getProducts } from './apiCore';
import Card from './Card';
import {useSelector} from 'react-redux'
import CarouselComp from './Carousel';
import ModalComponent from '../utils/ModalComponent';



const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [modalShow, setModalShow] = useState(true);
    const selectedData = useSelector((state) => state.SearchReducer);
    const searched = selectedData.searched;
    console.log(selectedData.searchResult.length);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            try{
                if (data.error) {
                    setError(data.error);
                } else {
                    setProductsBySell(data);
                }
            }
            catch(error){
                console.log(error)
            }
            
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            try{
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        }catch(error){
            console.log(error)
        }
        });
    };

    useEffect(() => {

        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <> 
        <ModalComponent
         show={modalShow}
         onHide={() => setModalShow(false)}
        />
        {selectedData.searchResult.length > 0 && searched ? null : <CarouselComp />}       
        <Layout
            title="FullStack React Node MongoDB Ecommerce App"
            description="Node React E-commerce App"
            className="container-fluid"
        >
           
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>

        </>
    );
};

export default Home;
