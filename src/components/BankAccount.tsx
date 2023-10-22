import { useState } from "react"
import { Currency } from "../utils/types";

interface BankAccountProps {
    currency: Currency;
    value: number;
    number: string;
}


function BankAccount({currency,value,number}:BankAccountProps) {

    return (
      <div className="card">
            <div className="card-money">
                <div className="card-money-value">{value}</div>
                <div className="card-money-currency">{currency}</div>
            </div>
            <div className="card-info">
                <div className="card-number">{number}</div>
            </div>
            <div className="card-actions">
                <div className="card-action-button">Tranfer To</div>
                <div className="card-action-button">History</div>
                <div className="card-deposit-button">+</div>
                <div className="card-action-button">DEL</div>
                <div className="card-action-button">INFO</div>
            </div>
      </div>  
    );
  }
  
  export default BankAccount;
  