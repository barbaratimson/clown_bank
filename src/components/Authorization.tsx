import { Route, Routes } from "react-router-dom";
import {FaPhoneAlt, FaUser} from "react-icons/fa";
import {MdOutlinePhone} from "react-icons/md";
import {CiCalendarDate} from "react-icons/ci";
import {FaCalendarDays} from "react-icons/fa6";
import {PiPasswordFill} from "react-icons/pi";
import {RiLockPasswordFill, RiLockPasswordLine} from "react-icons/ri";
import axios from "axios";
import {useState} from "react";
const link = process.env.REACT_APP_APIGATEWAY_LINK
const token = localStorage.getItem("token")
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
    const [userFirstname,setUserFirstname]=useState('')
    const [userLastname,setUserLastname]=useState('')
    const [userPatronymic,setUserPatronymic]=useState('')
    const [userEmail,setUserEmail]=useState('')
    const [userPhoneNumber,setUserPhoneNumber]=useState('')
    const [userBirthDate,setUserBirthDate]=useState<any>()
    const [userPassword,setUserPassword]=useState('')

    const registerAccount = async () => {
        try {
            console.log({firstName:userLastname,lastName:userLastname,patronymic:userPatronymic,password:userPassword,email:userEmail,birthDate:userBirthDate,phoneNumber:userPhoneNumber})
            const response = await axios.post(
                `${link}/user`,{firstName:userFirstname,lastName:userLastname,patronymic:userPatronymic,password:userPassword,email:userEmail,birthDate:userBirthDate,phoneNumber:userPhoneNumber},{
                    headers:{
                        "Authorization" : token
                    }
                });
            console.log(response.data)
        } catch (err) {
            console.error('Ошибка при получении списка треков:', err);
            console.log(err)
        }
    };
    return (
        <>
                <div className="authorization-title">Регистрация</div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">ФИО</div>
                    <div className='authorization-line-input-wrapper' style={{display:"flex",gap:"10px"}}>
                    <input value={userFirstname} onChange={(e)=>{setUserFirstname(e.target.value)}} className="authorization-line-input" type="text"></input>
                    <input value={userLastname} onChange={(e)=>{setUserLastname(e.target.value)}} className="authorization-line-input" type="text"></input>
                    <input value={userPatronymic} onChange={(e)=>{setUserPatronymic(e.target.value)}} className="authorization-line-input" type="text"></input>
                    </div>
                </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Номер телефона</div>
                    <div className='authorization-line-input-wrapper'>
                    <input value={userPhoneNumber} onChange={(e)=>{setUserPhoneNumber(e.target.value)}} className="authorization-line-input" type="text"></input>
                    </div>
                </div>
            <div className="authorization-line-wrapper">
                <div className="authorization-line-title">Email</div>
                <div className='authorization-line-input-wrapper'>
                    <input value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}} className="authorization-line-input" type="text"></input>
                </div>
            </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Дата рождения</div>
                    <div className='authorization-line-input-wrapper'>
                    <input value={userBirthDate} type="date" onChange={(e)=>{setUserBirthDate(e.target.value)}} className="authorization-line-input"></input>
                    </div>
                </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Пароль</div>
                    <div className='authorization-line-input-wrapper'>
                    <input value={userPassword} onChange={(e)=>{setUserPassword(e.target.value)}} className="authorization-line-input" type="password"></input>
                    </div>
                </div>
                <div className="authorization-line-wrapper">
                    <div className="authorization-line-title">Повторите пароль</div>
                    <div className='authorization-line-input-wrapper'>
                    <input className="authorization-line-input"type="password"></input>
                    </div>
                </div>
                <div className="authorization-submit-button-wrapper">
                    <div className="authorization-submit-button" onClick={()=>{registerAccount()}}>Зарегистрироваться</div>
                </div>
        </>
    )
}

function Login () {

    return (
        <>
                <div className="authorization-title">Войти</div>

                <div className="authorization-submit-button-wrapper">
                    <button className="authorization=submit-button" onClick={()=>{window.location.assign("/keycloak")}}>Войти c помощью Keycloak</button>
                </div>
        </>
    )
}

export default Authorization;
