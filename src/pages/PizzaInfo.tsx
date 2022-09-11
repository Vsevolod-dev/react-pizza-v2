import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const PizzaInfo: React.FC = () => {
    const navigate = useNavigate()
    const [pizzaInfo, setPizzaInfo] = useState<{
        imageUrl: string
        name: string
        price: number
    }>();
    const {id} = useParams()

    async function getPizza(id: string | undefined) {
        try {
            const res = await axios.get(`https://62fd0d3fb9e38585cd4bd016.mockapi.io/pizzas/${id}`)
            setPizzaInfo(res.data)
        } catch (e) {
            alert('Произошла ошибка при загрузке пиццы или пицца не неайдена (')
            console.error(e)
            navigate('/')
        }
    }

    useEffect(() => {
        getPizza(id)
    }, []);

    if (!pizzaInfo) {
        return <h2>Загрузка...</h2>
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
