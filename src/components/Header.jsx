import React from 'react';
import logoSvg from '../assets/img/pizza-logo.svg'
import {Link, useLocation} from "react-router-dom";
import Search from "./Search/Search";
import CartButton from "./Cart/CartButton";

const Header = () => {
    const location = useLocation()

    return (
        <div className="header">
            <div className="container">
                <Link to="/">
                    <div className="header__logo">
                        <img width="38" src={logoSvg} alt="Pizza logo"/>
                        <div>
                            <h1>React Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                {!location.pathname.includes('cart') && <>
                    <Search/>
                    <CartButton/>
                </>}
            </div>
        </div>
    )
};

export default Header;
