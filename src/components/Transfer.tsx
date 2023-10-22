import { useState } from "react";
import { BankAccountT } from "../utils/types";


interface TransferProps {
    target1:BankAccountT,
    target2?:BankAccountT,
}

function Transfer({target1,target2}:TransferProps) {
    const [validateTransfer,setValidateTransfer] = useState(false)
    const [amount,setAmount] = useState("")
    return (
    <div className="transfer-wrapper">
        {!validateTransfer ? (
            <>
        <select>
            <option>User Accounts1</option>
            <option>Other</option>
        </select>
        <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}placeholder="Money amount" />
        <div>Стрелка вниз</div>
        <select>
            <option>User Accounts2</option>
            <option>Other</option>
        </select>
        {amount ? (<button onClick={()=>{setValidateTransfer(true)}}>Submit</button>) : (<div>Empty fields</div>)}
            </>
        ) : (
            <TranferValidation amount = {amount}/>
        )}
        
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


  export default Transfer;
  