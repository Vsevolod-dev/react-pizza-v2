import './scss/app.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import PizzaInfo from "./pages/PizzaInfo";

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/pizza/:id'} element={<PizzaInfo/>}/>
                        <Route path={'/cart'} element={<Cart/>}/>
                        <Route path={'*'} element={<NotFound/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
