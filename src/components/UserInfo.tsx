import axios from "axios";
import BankingInfo from "./BankingInfo";
import { useEffect, useState } from "react";
import { changeUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { User } from "../utils/types";

const link = process.env.REACT_APP_APIGATEWAY_LINK
const token = localStorage.getItem("token")
function UserInfo() {
  const [isLoading,setIsLoading] = useState(true)
  const dispatch = useAppDispatch();
  const setUser = (user:User) => dispatch(changeUser(user))
  const user = useAppSelector(state => state.userStore.user)   

const createNewAccount = async () => {
  try {
    const response = await axios.post(
      `${link}/user-account`,{userId:user.uniqueUserId,balance:0,active:true},{
            headers:{
                "Authorization" : token
            }
        });
    window.location.reload()
  } catch (err) {
    console.error('Ошибка при получении списка треков:', err);
    console.log(err)
  }
};

    const fetchUser = async (UUID="0d49921b-7414-43ef-8215-930985397d75") => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                `${link}/user/${UUID}`, {
                    headers: {
                        "Authorization": token
                    }
                });
            setUser(response.data)
            console.log(response.data)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.error('Ошибка при получении списка треков:', err);
            console.log(err)
        }
    };

    const fetchKeycloakUser = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(
                `http://localhost:8080/realms/bank-app/protocol/openid-connect/userinfo`, {
                    headers: {
                        "Authorization": token
                    }
                });
            fetchUser(response.data.sub)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.error('Ошибка при получении списка треков:', err);
            console.log(err)
        }
    };

 useEffect(()=>{
     // fetchKeycloakUser()
     fetchUser()
 },[])
    if (isLoading) return <div>Loading....</div>
    return (
      <div className="user-info">
            <div className="user-account">
            <div className="user-avatar">
                <img className="user-profile-pic" src="https://sun9-36.userapi.com/impg/KBThyRabdLXw6Km0CnJ4gQJKcR7iw5Uu8T6wpg/D0Bh4x-veqY.jpg?size=822x1024&quality=95&sign=8f9825c03df99a8adaa7b94c9d0639d5&type=albumttps://vk.com/inferno_klv" alt="" />
            </div>
            <div className="user-desc">
                <div className="user-initials">{user?.firstName + " " + user?.lastName}</div>
                <div className="user-addition">Physical person</div>
            </div>
            <div className="user-create-account" onClick={()=>{createNewAccount()}}>
                <div className="user-create-account-button">New Account</div>
            </div>
            </div>
            <BankingInfo/>
      </div>  
    );
  }
  
  export default UserInfo;
  