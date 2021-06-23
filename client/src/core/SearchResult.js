import React, { useState, useEffect } from "react";
import Card from "./Card";
import '../core/coreStyle/searchComponent.css';
import '../core/coreStyle/SearchResult.css';
import {setSearchStatus} from '../redux/action';
import { useSelector ,useDispatch} from 'react-redux';


const SearchResult = () => {
    const selectedData = useSelector((state) => state.SearchReducer);
    const {searched }= selectedData;
    const dispatch = useDispatch()

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };
    const removeSearch =()=>{
        dispatch(setSearchStatus(false));
    }

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage( searched,results)}
                    <span className="search-result">
                        <button onClick={removeSearch} className="input-group-text btn search-result-button" type="button">Remove Search</button>
                    </span>
                </h2>

                <div className="row">
                    {results.map((product, i) => (
                        <div key={i} className="col-4 mb-3">
                            <Card key={i} product={product} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const showSearch = ()=>{
        return (
            <div className="row">
                <div className="container-fluid mb-3">
                    {searchedProducts(selectedData.searchResult)}
                </div>          
            </div>
        )
    }


    return (searched ? showSearch() : null)
        

};

export default SearchResult;


