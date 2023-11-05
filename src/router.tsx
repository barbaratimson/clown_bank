import { BrowserRouter, Route, Routes } from "react-router-dom"
import Authorization from "./components/Authorization"
import {store} from "./store/store"
import { Provider } from 'react-redux';
import Account from "./components/Profile";
const Router = () => {
    
    return <BrowserRouter>
        <Provider store={store}>
        <Routes>
            <Route element={<Account/>} path = '/profile' />
            <Route element={<Authorization/>} path = '/auth/*' />
            <Route path = '*' element = {<div>Страница не найдена</div>} />
        </Routes>
        </Provider>
    </BrowserRouter>
}

export default Router