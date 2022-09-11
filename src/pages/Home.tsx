import React, {useEffect, useRef} from 'react';
import qs from "qs";
import {useNavigate} from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import PizzaBlockSkeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizza} from "../redux/slices/pizzaSlice";
import {selectCart} from "../redux/slices/cartSlice";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearchRef = useRef(false);
    const isMountedRef = useRef(false);

    const {items} = useSelector(selectCart)
    let itemsCount: object = {}
    items.forEach((item: any) => {
       // @ts-ignore
        if (itemsCount[item.id]) {
           // @ts-ignore
            itemsCount[item.id] += item.count
       } else {
           // @ts-ignore
            itemsCount[item.id] = item.count
       }
    })

    // @ts-ignore
    const searchInput = useSelector(state => state.filter.searchInput)
    const {items: pizzas, status: loadingStatus} = useSelector(selectPizza)
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
    } = useSelector(selectFilter)

    async function getPizzas() {
        let params = []
        params.push(activeCategory ? `category=${activeCategory}` : "")
        params.push(`sortBy=${pizzasOptions[activeSort].sortProp}`)
        params.push(`order=${order ? "asc" : "desc"}`)
        searchInput && params.push(`search=${searchInput}`)
        params.push(`page=${page + 1}`)
        const paramsStr: string = params.join('&')

        // @ts-ignore
        dispatch(fetchPizzas(paramsStr))
    }

    useEffect(() => {
        if (!isSearchRef.current) getPizzas()
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
        .map((pizza: any) => {
            let count = 0
            for (let ic in itemsCount) {
                if (+pizza.id === +ic) { // @ts-ignore
                    count = itemsCount[ic]
                }
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
                {loadingStatus === 'loading'
                    ? skeletons
                    : filteredPizzas
                }
            </div>
            <Pagination />
        </div>
    );
};

export default Home;
