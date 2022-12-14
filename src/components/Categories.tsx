import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilterCategory, setActiveCategory} from "../redux/slices/filterSlice";

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закртые']

const Categories: React.FC = () => {
    const activeCategory = useSelector(selectFilterCategory)
    const dispatch = useDispatch()

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) =>
                    <li
                        className={activeCategory === index ? "active" : ""}
                        key={index}
                        onClick={() => dispatch(setActiveCategory(index))}>
                        {category}
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Categories;
