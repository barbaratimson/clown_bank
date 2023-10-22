import { Route, Routes } from "react-router-dom";

function Authorization() {
  return (
    <div className="authorization-wrapper">
        <div className="authorization-window">
        <div className="registration-wrapper">
        <div className="registration-left-side">
            <div className="logo">BEERBANK</div>
            <div>Лучший банк внатуре</div>
        </div>
        <div className="registration-right-side">
            <Routes>
                <Route element={<Login/>} path = '/login' />
                <Route element={<Registration/>} path = '/register' />
            </Routes>
        </div>
        </div>
        </div>
    </div>  
  );
}


function Registration () {
    return (
        <>
                <div className="authorization-title">Регистрация</div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">ФИО</div>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Номер Телефона</div>
                    <input type="text"></input>
                </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Дата рождения</div>
                    <input type="text"></input>
                </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Пароль</div>
                    <input type="password"></input>
                </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Подтвердите пароль</div>
                    <input type="password"></input>
                </div>
                <div className="authorization-submit-button-wrapper">
                    <button className="authorization=submit-button">Зарегестрироваться</button>
                </div>
        </>
    )
}

function Login () {
    return (
        <>
                <div className="authorization-title">Войти</div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Номер Телефона</div>
                    <input type="text"></input>
                </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Пароль</div>
                    <input type="text"></input>
                </div>
                <div className="authorization-submit-button-wrapper">
                    <button className="authorization=submit-button">Войти</button>
                </div>
        </>
    )
}

export default Authorization;
