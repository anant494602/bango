import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import Accordion from 'react-bootstrap/Accordion'
import { prices } from "./fixedPrices";
import './coreStyle/shopComponent.css'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [accordion1, setaccordion1] = useState(true);
    const [accordion2, setaccordion2] = useState(false);
    const [accordion3, setaccordion3] = useState(false);
    const [accordion4, setaccordion4] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };
    const handleClick1=()=>{
        setaccordion1(!accordion1);
        setaccordion2(false);
        setaccordion3(false);
        setaccordion4(false);

    }
    const handleClick2=()=>{
        setaccordion2(!accordion2);
        setaccordion1(false);
        setaccordion3(false);
        setaccordion4(false);

    }
    const handleClick3=()=>{
        setaccordion3(!accordion3);
        setaccordion2(false);
        setaccordion1(false);
        setaccordion4(false);

    }
    const handleClick4=()=>{
        setaccordion4(!accordion4);
        setaccordion2(false);
        setaccordion3(false);
        setaccordion1(false);

    }

    return (
        <Layout
            title="Shop Page"
            description="Search and find products of your choice"
        >
            <div className="row">
                <div className="col-3 pannel">
                    <div className='bango-accordion'>
                    <h4 onClick={handleClick1}>Filter by  Category {accordion1 ? <i class="fa fa-minus-circle" ></i>:<i class="fa fa-plus-circle " ></i>}</h4>
                        <ul className={accordion1 ? 'show1' : 'hide1'}>
                            <Checkbox
                                categories={categories}
                                handleFilters={filters =>
                                    handleFilters(filters, "category")
                                }
                            />
                        </ul>
                    </div>
                <div className='bango-accordion'>
                    <h4 onClick={handleClick2}>Filter by price range {accordion2 ? <i class="fa fa-minus-circle" ></i>:<i class="fa fa-plus-circle " ></i>}</h4>
                    <div className={accordion2 ? 'show2' : 'hide2'}>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                    </div>
                    <div className='bango-accordion'>
                    <h4 onClick={handleClick4}>Filter by shop {accordion4 ? <i class="fa fa-minus-circle" ></i>:<i class="fa fa-plus-circle " ></i>}</h4>
                    <div className={accordion4 ? 'show4' : 'hide4'}>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            } 
                        />
                    </div>
                    </div>
                    <div className='bango-accordion'>
                    <h4 onClick={handleClick3}>Filter by Brand {accordion3 ? <i class="fa fa-minus-circle" ></i>:<i class="fa fa-plus-circle " ></i>}</h4>
                    <div className={accordion3 ? 'show3' : 'hide3'}>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                    </div>
                
                </div>
    

                <div className="col-9 pannel-content">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
