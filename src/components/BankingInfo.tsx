import axios from "axios";
import { BankAccountT, pageType } from "../utils/types";
import Card from "./Card";
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { changeUserAccounts } from "../store/slices/userAccountsSlice";
import BankAccount from "./BankAccount";

const link = process.env.REACT_APP_LINK_ACCOUNTSERVICE_LINK

function BankingInfo() {
    const user = useAppSelector(state => state.userStore.user)   
    const userAccounts = useAppSelector(state => state.userAccountsStore.userAccounts)   
    const dispatch = useAppDispatch();
    const setUserAccounts = (accounts:Array<BankAccountT>) => dispatch(changeUserAccounts(accounts))
    const [isLoading,setIsLoading] = useState(true)
    

    const fetchAccounts = async (uuid:string) => {
        try {
          const response = await axios.get(
            `${link}/user-account?uniqueNumber=${uuid}`);
            setUserAccounts(response.data)
          console.log(response.data)
          setIsLoading(false)
        } catch (err) {
          console.error('Ошибка при получении списка треков:', err);
          console.log(err)
        }
    };
    
    useEffect(()=>{
      fetchAccounts(user.uniqueUserId)
    },[])
    
    if (isLoading) return <div>Loading...</div>

    return (
        <>
      <div className="banking-info">
          <div className="banking-accounts">
          {userAccounts ? (userAccounts.map(account =>(
            <BankAccount key={account.number} value={account.balance} currency="$" number={account.number} />
            ))):null}
            </div>
      </div>  
             </>
    );
  }
  
  export default BankingInfo;
  