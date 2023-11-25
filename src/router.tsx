import { BrowserRouter, Route, Routes } from "react-router-dom"
import Authorization from "./components/Authorization"
import {store} from "./store/store"
import { Provider } from 'react-redux';
import Account from "./components/Profile";
import KeycloakAuth from "./components/KeycloakAuth";
const Router = () => {
    
    return <BrowserRouter>
        <Provider store={store}>
        <Routes>
            <Route element={<Account/>} path = '/' />
            <Route element={<Authorization/>} path = '/auth/*' />
            <Route path = '*' element = {<div>Страница не найдена</div>} />
            <Route path = "/keycloak/*" element={<KeycloakAuth/>}></Route>
        </Routes>
        </Provider>
    </BrowserRouter>
}

export default Router