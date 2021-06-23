import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";
import {useDispatch}  from 'react-redux';
import '../core/coreStyle/searchComponent.css';
import {setUpSearchResult} from '../redux/action';


const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const dispatch = useDispatch();

    const { categories, category, search, results, searched } = data;

    useEffect(() => {

        const loadCategories = async () => {
            try{
                const data = await getCategories();
                setData({ ...data, categories: data });
            }
            catch(error){
                throw console.error();
            }
        };
        loadCategories();
    }, []);

    

    const searchSubmit = e => {
        e.preventDefault(); 
        dispatch(setUpSearchResult(data));
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: true });
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit} className='search-form'> 
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                    />
                </div>
                <div
                    className="btn input-group-append"
                    style={{ border: "none" }}
                >
                    <button className="input-group-text btn search-button" type="submit">Search</button>
                </div>
            </span>
        </form>
    );

    return (
            
            <div className="row">
                <div className="container mb-3">{searchForm()}</div>  
            </div>
    );
};

export default Search;
