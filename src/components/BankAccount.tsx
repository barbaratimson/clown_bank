import { useEffect, useState } from "react"
import {BankAccountT, CardT, Currency} from "../utils/types";
import Card from "./Card";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { changeUserCards } from "../store/slices/userCardsSlice";
import axios from "axios";
import {SlOptions} from "react-icons/sl";
import {BsSendFill} from "react-icons/bs";
import Modal from "./Modal";
import Transfer from "./Transfer";
import {MdDelete, MdHistory} from "react-icons/md";
import {LuHistory} from "react-icons/lu";
import History from "./History";

interface BankAccountProps {
    account:BankAccountT,
    currency:Currency
}



const link = process.env.REACT_APP_APIGATEWAY_LINK
const token = localStorage.getItem("token")
function BankAccount({account,currency}:BankAccountProps) {
    const dispatch = useAppDispatch();
    const [userCards,setUserCards] = useState<CardT[]>()
    const [showModal,setShowModal] = useState(false)
    const [showModalHistory,setShowModalHistory] = useState(false)
    const createCard = async (id:string) => {
        try {
          const response = await axios.post(
            `${link}/card`,{userAccountNumber:id,paymentSystem:"VISA"},{
                  headers:{
                      "Authorization" : token
                  }
              });
          fetchCards(account.number)
        } catch (err) {
          console.error('Ошибка при получении списка треков:', err);
          console.log(err)
        }
    };


    const fetchCards = async (id:string) => {
      try {
        const response = await axios.post(
          `${link}/card/all`,{accountNumber:id},{
                headers:{
                    "Authorization" : token
                }
            });
          setUserCards(response.data)
      } catch (err) {
        console.error('Ошибка при получении списка треков:', err);
        console.log(err)
      }
  };

    const closeAccount = async (uuid:string) => {
        try {
            const response = await axios.post(
                `${link}/user-account/close`,{accountNumber:uuid},{
                    headers:{
                        "Authorization" : token
                    }
                });
            console.log(response)
            window.location.reload()
        } catch (err) {
            console.error('Ошибка при получении списка треков:', err);
            console.log(err)
        }
    };




    useEffect(()=>{
      fetchCards(account.number)
    },[])

    return (
        <>
      <div className={`bank-account ${!account.active ? "disabled" : null}`}>
            <div className="bank-account-topline">
            <div className="bank-account-money">
                <div className="bank-account-money-value">{account.balance ?? 0}</div>
                <div className="bank-account-money-currency">{currency}</div>
            </div>
                {account.active ? (
            <div className="bank-account-actions">
                <div className="card-action-button" onClick={()=>{setShowModal(true)}}><BsSendFill/></div>
                <div className="card-action-button" onClick={()=>{closeAccount(account.number)}}><MdDelete/></div>
                <div className="card-action-button" onClick={()=>{setShowModalHistory(true)}}><LuHistory /></div>
                <div className="card-action-button"><SlOptions/></div>
                {/*<div className="card-deposit-button">+</div>*/}
                {/*<div className="card-action-button">DEL</div>*/}
                {/*<div className="card-action-button">INFO</div>*/}
            </div>
                ): null}
            </div>
            <div className="bank-account-info">
                <div>Счет</div>
                <div className="bank-account-number">{account.number.substring(account.number.length-4)}</div>
            </div>
            <div className={`cards-container  ${!account.active ? "inactive" : null}`}>
              {userCards ? userCards.map(card => !card.blocked ? (
                                <Card key={card.number} card={card} />
              ):null):null}
                {account.active ? (
                    <div className="card create" onClick={()=>{createCard(account.number)}}>
                        <div className="card-money">
                            <div className="card-money-value">+</div>
                        </div>
                    </div>
                ):null}
            </div>
      </div>

    {showModal ? (
        <Modal active={showModal} setActive={setShowModal} children={<Transfer target1={account}/>}></Modal>
    ):null}

            {showModalHistory ? (
                <Modal active={showModalHistory} setActive={setShowModalHistory} children={<History account={account}/>}></Modal>
            ):null}
        </>
    );
  }

  export default BankAccount;

