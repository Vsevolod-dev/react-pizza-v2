import React, {useContext, useEffect, useRef, useState} from 'react';
import qs from "qs";
import {useNavigate} from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setFilters} from "../redux/slices/filterSlice";
import {logDOM} from "@testing-library/react";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearchRef = useRef(false);
    const isMountedRef = useRef(false);

    const {items} = useSelector(state => state.cart)
    let itemsCount = {}
    items.forEach(item => {
       if (itemsCount[item.id]) {
           itemsCount[item.id] += item.count
       } else {
           itemsCount[item.id] = item.count
       }
    })

    const {searchInput} = useContext(SearchContext);
    const [pizzas, setPizzas] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const pizzasOptions = [
        { name: 'популярности', sortProp: 'rating' },
        { name: 'цене', sortProp: 'price' },
        { name: 'алфавиту', sortProp: 'name' }
    ]

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            dispatch(setFilters(params))
            isSearchRef.current = true
        }
    }, []);

    const {
        category: activeCategory,
        activeSort,
        order,
        currentPage: page
    } = useSelector((state) => state.filter)

    function fetchPizzas() {
        setIsLoaded(false)

        let params = []
        params.push(activeCategory ? `category=${activeCategory}` : "")
        params.push(`sortBy=${pizzasOptions[activeSort].sortProp}`)
        params.push(`order=${order ? "asc" : "desc"}`)
        searchInput && params.push(`search=${searchInput}`)
        params.push(`page=${page + 1}`)
        params = params.join('&')

        axios.get('https://62fd0d3fb9e38585cd4bd016.mockapi.io/pizzas?limit=4&' + params
        )
            .then(res => setPizzas(res.data))
            .finally(() => setIsLoaded(true))
    }

    useEffect(() => {
        if (!isSearchRef.current) fetchPizzas()
        isSearchRef.current = false
    }, [activeCategory, activeSort, order, searchInput, page]);

    useEffect(() => {
        if (isMountedRef.current) {
            const queryString = qs.stringify({
                category: activeCategory,
                activeSort,
                currentPage: page,
                order: +order
            })
            navigate('?' + queryString)
        }
        isMountedRef.current = true
    }, [activeCategory, activeSort, order, searchInput, page]);


    let filteredPizzas = pizzas
        // .filter(pizza => pizza.name.toLowerCase().includes(searchInput.toLowerCase()))
        .map((pizza) => {
            let count = 0
            for (let ic in itemsCount) {
                if (pizza.id === +ic) count = itemsCount[ic]
            }
            return <PizzaBlock key={pizza.id} {...pizza} count={count}/>
        })

    let skeletons = [...Array(6)].map((_, i) => <PizzaBlockSkeleton key={i}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort pizzasOptions={pizzasOptions} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? filteredPizzas
                    : skeletons
                }
            </div>
            <Pagination />
        </div>
    );
};

export default Home;
