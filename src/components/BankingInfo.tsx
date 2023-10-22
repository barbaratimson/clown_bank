import axios from "axios";
import { BankAccountT, pageType } from "../utils/types";
import Card from "./Card";
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { changeUserAccounts } from "../store/slices/userAccountsSlice";
import BankAccount from "./BankAccount";

const link = process.env.REACT_APP_LINK_ACCOUNTSERVICE_LINK

function BankingInfo() {
    const [selectedType,setSelectedType] = useState<pageType>("cards");
    const user = useAppSelector(state => state.userStore.user)   
    const userAccounts = useAppSelector(state => state.userAccountsStore.userAccounts)   
    const dispatch = useAppDispatch();
    const setUserAccounts = (accounts:Array<BankAccountT>) => dispatch(changeUserAccounts(accounts))
    const createNewAccount = async () => {
        try {
          const response = await axios.post(
            `${link}/user-account`,{data:{userId:user.uniqueUserId,type:"SAVING",number:Math.random()}});
          console.log(response.data)  
        } catch (err) {
          console.error('Ошибка при получении списка треков:', err);
          console.log(err)
        }
    };

    const fetchAccounts = async (uuid="af1b8ec9-0670-4ec8-98b4-4faad32d23e3") => {
        try {
          const response = await axios.get(
            `${link}/user-account?uniqueNumber=${uuid}`);
            setUserAccounts(response.data)
          console.log(response.data)
        } catch (err) {
          console.error('Ошибка при получении списка треков:', err);
          console.log(err)
        }
    };
    
    useEffect(()=>{
      fetchAccounts(user.uniqueUserId)
    },[])

    return (
        <>
        <div className="banking-selection">
            <div className={`banking-selection-button ${selectedType === "cards" ? "active" : ""}`} onClick={()=>{setSelectedType("cards")}}>Cards</div>
            <div className={`banking-selection-button ${selectedType === "accounts" ? "active" : ""}`} onClick={()=>{setSelectedType("accounts")}}>Accounts</div>
        </div>
      <div className="banking-info">
        {selectedType === "cards" ? 
        (<>
            <Card value={2000} currency="$" number="434344234" processor="VISA" />
            <Card value={2000} currency="$" number="434344234" processor="VISA" />
            <Card value={2000} currency="$" number="434344234" processor="VISA" />
            <Card value={2000} currency="$" number="434344234" processor="VISA" />
            <Card value={2000} currency="$" number="434344234" processor="VISA" />
            <div className="card create">
            <div className="card-money">
                <div className="card-money-value">+</div>
            </div>
      </div>  
            </>) : selectedType === "accounts" ? 
         (<>
          {userAccounts ? (userAccounts.map(account =>(
            <BankAccount key={account.number} value={account.balance} currency="$" number={account.number.slice(32)} />
          ))):(null)}
            <div onClick={()=>{createNewAccount()}} className="card create">
            <div className="card-money">
                <div className="card-money-value">+</div>
            </div>
            </div>
            </>) : null}

      </div>  
             </>
    );
  }
  
  export default BankingInfo;
  