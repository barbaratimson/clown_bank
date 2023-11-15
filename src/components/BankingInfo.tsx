import axios from "axios";
import { BankAccountT } from "../utils/types";
import Card from "./Card";
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { changeUserAccounts } from "../store/slices/userAccountsSlice";
import BankAccount from "./BankAccount";

const link = process.env.REACT_APP_LINK_ACCOUNTSERVICE_LINK

type pageType = "myAccounts" | "closedAccounts"
function BankingInfo() {
    const user = useAppSelector(state => state.userStore.user)   
    const userAccounts = useAppSelector(state => state.userAccountsStore.userAccounts)   
    const dispatch = useAppDispatch();
    const setUserAccounts = (accounts:Array<BankAccountT>) => dispatch(changeUserAccounts(accounts))
    const [isLoading,setIsLoading] = useState(true)
    const [selectedType,setSelectedType] = useState<pageType>("myAccounts");
    

    const fetchAccounts = async (uuid:string) => {
        try {
          const response = await axios.get(
            `${link}/user-account?uniqueNumber=${uuid}`);
            setUserAccounts(response.data)
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
        <div className="banking-selection">
            <div className={`banking-selection-button ${selectedType === "myAccounts" ? "active" : ""}`} onClick={()=>{setSelectedType("myAccounts")}}>My Accounts</div>
            <div className={`banking-selection-button ${selectedType === "closedAccounts" ? "active" : ""}`} onClick={()=>{setSelectedType("closedAccounts")}}>ClosedAccounts</div>
        </div>
      <div className="banking-info">'
          <div className="banking-accounts">
          {userAccounts ? (userAccounts.map(account => selectedType === "myAccounts" && account.active ? (
            <BankAccount key={account.number} account={account} currency={"$"} />
            ): selectedType === "closedAccounts" && !account.active ?(
              <BankAccount key={account.number} account={account} currency={"$"} />
          ):null)):null}
            </div>
      </div>
        </>
    );
  }
  
  export default BankingInfo;
  