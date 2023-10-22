import { useState } from "react"
import { Currency, Processor } from "../utils/types";

interface CardProps {
    currency: Currency;
    value: number;
    number: string;
    processor: Processor;
}


function Card({currency,value,number,processor}:CardProps) {

    return (
      <div className="card">
            <div className="card-money">
                <div className="card-money-value">{value}</div>
                <div className="card-money-currency">{currency}</div>
            </div>
            <div className="card-info">
                <div className="card-number">{number}</div>
                <div className="card-processor">{processor}</div>
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
  
  export default Card;
  