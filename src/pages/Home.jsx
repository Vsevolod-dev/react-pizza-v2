import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useSelector} from "react-redux";
import axios from "axios";

const Home = () => {
    const {
        category: activeCategory,
        activeSort,
        order,
        currentPage: page
    } = useSelector((state) => state.filter)

    const {searchInput} = useContext(SearchContext);
    const [pizzas, setPizzas] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const pizzasOptions = [
        { name: 'популярности', sortProp: 'rating' },
        { name: 'цене', sortProp: 'price' },
        { name: 'алфавиту', sortProp: 'name' }
    ]

    useEffect(() => {
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
    }, [activeCategory, activeSort, order, searchInput, page]);

    let filteredPizzas = pizzas
        // .filter(pizza => pizza.name.toLowerCase().includes(searchInput.toLowerCase()))
        .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)

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
