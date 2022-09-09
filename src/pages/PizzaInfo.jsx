import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const PizzaInfo = () => {
    const [pizzaInfo, setPizzaInfo] = useState([]);
    const {id} = useParams()

    const getPizza = async (id) => {
        const res = await axios.get(`https://62fd0d3fb9e38585cd4bd016.mockapi.io/pizzas?id=${id}`)

        if (res) {
            console.log(res.data[0])
            setPizzaInfo(res.data[0])
        }
    }

    useEffect(() => {
        getPizza(id)
    }, []);


    return (
        <div>
            PizzaInfo <br/>
            {JSON.stringify(pizzaInfo)}
        </div>
    );
};

export default PizzaInfo;
