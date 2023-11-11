import React, {useEffect, useState} from "react";
import {BankAccountT, pageType} from "../utils/types";
import {useAppSelector} from "../utils/hooks";


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
    console.log(selectedAccount,targetAccount)
    useEffect(() => {
        setSelectedAccount(target1)
    }, [target1]);

    if (validateTransfer) return <div className="transfer-wrapper"><TranferValidation amount = {amount}/></div>

    return (
    <div className="transfer-wrapper">
        <div className="banking-selection">
            <div className={`banking-selection-button ${selectedType === "myAccounts" ? "active" : ""}`} onClick={()=>{setSelectedType("myAccounts")}}>My Accounts</div>
            <div className={`banking-selection-button ${selectedType === "people" ? "active" : ""}`} onClick={()=>{setSelectedType("people")}}>People</div>
        </div>
        <AccountSelection target={target1} state={selectedAccount} setState={setSelectedAccount} userAccounts={userAccounts}/>

        <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}placeholder="Money amount" />
        <div>Стрелка вниз</div>

        <AccountSelection target={target2} state={targetAccount} setState={setTargetAccount} userAccounts={userAccounts}/>

        {amount ? (<button onClick={()=>{setValidateTransfer(true)}}>Submit</button>) : (<div>Empty fields</div>)}
    </div>
    );
  }
  interface Response {
    status: "OK" | any
  }
  function TranferValidation({amount}:any){
    const [isLoading,setIsLoading] = useState(true)
    const [response,setResponse] = useState<Response>({status:"OK"})

    const fetchTransfer = (amount1:any) =>{
        console.log(amount1)
    }

    if (isLoading) return <div>Loading</div>
    return (
        <div>
        {response.status === "OK" ? (<div>OK</div>) : (<div>NOT OK</div>)}
        </div>
    )
  }

function AccountSelection({target,state,setState,userAccounts}:{target?:BankAccountT,state:any,setState:any,userAccounts:Array<BankAccountT>}){

    useEffect(() => {
        setState(target)
    }, [target]);

    return (
    <>
        {!target ? (
            <select onChange={(e)=>{setState(userAccounts.find(elem => elem.number == e.target.value))}}>
                {userAccounts?.map((account)=>(
                    <option key={account.number} value={account.number}>{account.number}</option>
                ))}
                <option hidden={true}>Select Account</option>
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
  