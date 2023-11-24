import {useEffect, useState} from "react"
import { CardT, Currency, Processor } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { changeUserCards } from "../store/slices/userCardsSlice";
import {SlOptions} from "react-icons/sl";
import {FaCircleXmark} from "react-icons/fa6";
import {AiOutlineInfoCircle} from "react-icons/ai";

interface CardProps {
    card:CardT
}

function Card({card}:CardProps) {
    const [sliderValue,setSliderValue] = useState(0)
    const [showCredits,setShowCredits]= useState(false)
    const cardNumber = card.number.toString()
    const checkSlider = ()=>{
        if (sliderValue <100) {
            setSliderValue(0)
        }
    }
    useEffect(() => {
        if(sliderValue>=100){
            setShowCredits(true)
            setSliderValue(0)
        }
    }, [sliderValue]);
    return (
      <div className="card">
            <div className="card-info">
                <div className="card-number">{cardNumber.substring(cardNumber.length-4)}</div>
                {showCredits ? (
                    <div className="card-cridentials">
                        <div className="card-processor">{card.expiredDate}</div>
                        <div className="card-processor">{card.cvv}</div>
                    </div>
                ):(
                    <div className="card-swiper-wrapper">
                    <input className="card-swiper" type="range" min={0} max={100} value={sliderValue} onMouseOut={()=>{checkSlider()}} onChange={(e)=>{setSliderValue(Number(e.target.value))}}/>
                    </div>
                )}
                <div className="card-processor">{card.paymentSystem}</div>
                <div className="card-actions">
                    <div className="card-action-button"><SlOptions/></div>
                </div>
            </div>
      </div>  
    );
  }
  
  export default Card;
  