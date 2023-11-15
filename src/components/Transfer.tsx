import React, {useEffect, useState} from "react";
import {BankAccountT, pageType} from "../utils/types";
import {useAppSelector} from "../utils/hooks";
import axios, {AxiosError, AxiosResponse} from "axios";
import {wait} from "@testing-library/user-event/dist/utils";

const link = process.env.REACT_APP_LINK_TRANSACTIONSERVICE_LINK

interface TransferProps {
    target1?:BankAccountT,
    target2?:BankAccountT,
}

function Transfer({target1,target2}:TransferProps) {
    const [validateTransfer,setValidateTransfer] = useState(false)
    const [selectedType,setSelectedType] = useState<pageType>("myAccounts");
    const [amount,setAmount] = useState("")
    const [selectedAccount,setSelectedAccount] = useState<BankAccountT>()
    const [targetAccount,setTargetAccount] = useState<BankAccountT>()
    const userAccounts = useAppSelector(state => state.userAccountsStore.userAccounts)
    useEffect(() => {
        setSelectedAccount(target1)
    }, [target1]);

    if (validateTransfer) return <div className="transfer-wrapper"><TransferValidation key={"Transfer"} target1={selectedAccount?.number} target2={targetAccount?.number} amount = {amount}/></div>

    return (
    <div className="transfer-wrapper">
        <div className="banking-selection">
            <div className={`banking-selection-button ${selectedType === "myAccounts" ? "active" : ""}`} onClick={()=>{setSelectedType("myAccounts")}}>My Accounts</div>
            <div className={`banking-selection-button ${selectedType === "people" ? "active" : ""}`} onClick={()=>{setSelectedType("people")}}>People</div>
        </div>
        <AccountSelection target={target1} state={selectedAccount} setState={setSelectedAccount} userAccounts={userAccounts}/>

        <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}placeholder="Money amount" />
        <div>Стрелка вниз</div>

        <AccountSelection target1={target1} target={target2} state={targetAccount} setState={setTargetAccount} userAccounts={userAccounts}/>

        {amount ? (<button onClick={()=>{setValidateTransfer(true)}}>Submit</button>) : (<div>Empty fields</div>)}
    </div>
    );
  }
  function TransferValidation({amount,target1,target2}:any){
    const [isLoading,setIsLoading] = useState(true)
    const [response,setResponse] = useState<AxiosResponse>()


      useEffect(() => {
          const fetchTransfer = async () => {
              try {
                  const response = await axios.post(
                      `${link}/transaction`,{senderAccountNumber:target1,receiverAccountNumber:target2,amount:amount});
                  setResponse(response)
                  console.log(response)
                  setIsLoading(false)
              } catch (err:any) {
                  console.error('Ошибка при проведении перевода:', err)
                  setResponse(err.response)
                  setIsLoading(false)
                  // window.location.assign("/error")
              }
          };
          fetchTransfer()
      }, []);

      useEffect(() => {
          if (response?.status === 200) {
          let wait = setTimeout(()=>{
                  window.location.reload()
          },2000)
          return ()=>{clearTimeout(wait)}
      }
      }, [response])

    if (isLoading) return <div>Loading</div>

      return (
        <div>
        {response?.status === 200 ? (<div>OK</div>) : (<div>{response?.data}</div>)}
        </div>
    )
  }

function AccountSelection({target,target1,state,setState,userAccounts}:{target?:BankAccountT,target1?:BankAccountT,state:any,setState:any,userAccounts:Array<BankAccountT>}){

    useEffect(() => {
        setState(target)
    }, [target]);

    return (
    <>
        {!target ? (
            <select defaultValue={"default"} onChange={(e)=>{setState(userAccounts.find(elem => elem.number === e.target.value))}}>
                {userAccounts?.map((account)=> account.active && account!== target1 ? (
                    <option key={account.number} value={account.number}>{account.number}</option>
                ):null)}
                <option value={"default"} hidden={true}>Select Account</option>
            </select>
        ) : null}

        {state ? (
        <div className="transfer-account">
            <div className="transfer-account-number">{state.number}</div>
            <div className="transfer-account-balance">Balance: {state.balance ?? 0}</div>
        </div>
        ): null}
    </>
    )
}


  export default Transfer;
  