import { useEffect, useState } from "react"
import { CardT, Currency } from "../utils/types";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { changeUserCards } from "../store/slices/userCardsSlice";
import axios from "axios";

interface BankAccountProps {
    currency: Currency;
    value: number;
    number: string;
}



const link = process.env.REACT_APP_LINK_ACCOUNTSERVICE_LINK

function BankAccount({currency,value,number}:BankAccountProps) {
    const dispatch = useAppDispatch();
    // const userCards = useAppSelector(state => state.userCardsStore.userCards)   
    // const setUserCards = (cards:Array<CardT>) => dispatch(changeUserCards(cards))
    const [userCards,setUserCards] = useState<CardT[]>()
    const createCard = async (id:string) => {
        try {
          const response = await axios.post(
            `${link}/card`,{userAccountNumber:id,paymentSystem:"VISA"});
          fetchCards(number)
        } catch (err) {
          console.error('Ошибка при получении списка треков:', err);
          console.log(err)
        }
    };

    const fetchCards = async (id:string) => {
      try {
        console.log(id)
        const response = await axios.post(
          `${link}/card/all`,{accountNumber:id});
          setUserCards(response.data)
      } catch (err) {
        console.error('Ошибка при получении списка треков:', err);
        console.log(err)
      }
  };


    useEffect(()=>{
      fetchCards(number)
    },[])

    return (
      <div className="bank-account">
            <div className="bank-account-topline">
            <div className="bank-account-money">
                <div className="bank-account-money-value">{value ?? 0}</div>
                <div className="bank-account-money-currency">{currency}</div>
            </div>
            <div className="bank-account-actions">
                <div className="card-action-button">Tranfer To</div>
                <div className="card-action-button">History</div>
                <div className="card-deposit-button">+</div>
                <div className="card-action-button">DEL</div>
                <div className="card-action-button">INFO</div>
            </div>
            </div>
            <div className="bank-account-info">
                <div>Счет</div>
                <div className="bank-account-number">{number}</div>
            </div>
            <div className="cards-container">
              {userCards ? userCards.map(card => !card.blocked ? (
                                <Card key={card.number} card={card} />
              ):null):null}
                <div className="card create" onClick={()=>{createCard(number)}}>
                <div className="card-money">
                <div className="card-money-value">+</div>
                </div>
            </div>
            
            </div>
      </div>  
    );
  }
  
  export default BankAccount;
  