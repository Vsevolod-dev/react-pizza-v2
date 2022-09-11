import './scss/app.scss';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import PizzaInfo from "./pages/PizzaInfo";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}> {/* if you need static header or menu */}
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/pizza/:id'} element={<PizzaInfo/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
