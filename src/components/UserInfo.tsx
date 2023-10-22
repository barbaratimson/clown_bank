import axios from "axios";
import BankingInfo from "./BankingInfo";
import { useEffect, useState } from "react";
import { changeUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { User } from "../utils/types";

const link = process.env.REACT_APP_LINK_ACCOUNTSERVICE_LINK

function UserInfo() {
  const [isLoading,setIsLoading] = useState(true)
  const dispatch = useAppDispatch();
  const setUser = (user:User) => dispatch(changeUser(user))
  const user = useAppSelector(state => state.userStore.user)   

  const fetchUser = async (UUID="af1b8ec9-0670-4ec8-98b4-4faad32d23e3") => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${link}/user/${UUID}`);
      setUser(response.data)
      console.log(response.data)
      setIsLoading(false)
    } catch (err) {
      console.error('Ошибка при получении списка треков:', err);
      console.log(err)
    }
};

 useEffect(()=>{
  fetchUser()
 },[])
    if (isLoading) return <div>Loading....</div>
    return (
      <div className="user-info">
            <div className="user-account">
            <div className="user-avatar">
                <img className="user-profile-pic" src="https://sun9-36.userapi.com/impg/KBThyRabdLXw6Km0CnJ4gQJKcR7iw5Uu8T6wpg/D0Bh4x-veqY.jpg?size=822x1024&quality=95&sign=8f9825c03df99a8adaa7b94c9d0639d5&type=albumttps://vk.com/inferno_klv" alt="" />
            </div>
            <div>
                <div className="user-initials">{user?.firstName + " " + user?.lastName}</div>
                <div className="user-addition">Physical person</div>
            </div>
            </div>
            <BankingInfo/>
      </div>  
    );
  }
  
  export default UserInfo;
  