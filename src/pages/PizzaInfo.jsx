import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const PizzaInfo = () => {
    const [pizzaInfo, setPizzaInfo] = useState();
    const {id} = useParams()

    async function getPizza (id) {
        try {
            const res = await axios.get(`https://62fd0d3fb9e38585cd4bd016.mockapi.io/pizzas/${id}`)
            setPizzaInfo(res.data)
        } catch (e) {
            console.error(e)
            setPizzaInfo('error')
        }
    }

    useEffect(() => {
        getPizza(id)
    }, []);

    if (!pizzaInfo) {
        return <h2>Загрузка...</h2>
    }

    if (pizzaInfo === 'error') {
        return <h2>Произошла ошибка, либо пицца не найдена</h2>
    }

    return (
        <div>
            <h2>PizzaInfo</h2>
            <img
                src={pizzaInfo.imageUrl}
                alt="Pizza"
                width={400}
                height={400}
            />
            <h2>{pizzaInfo.name}</h2>
            <h3>{pizzaInfo.price} р.</h3>
        </div>
    );
};

export default PizzaInfo;
