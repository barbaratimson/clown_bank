import {useEffect, useState} from "react"
import { CardT, Currency, Processor } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { changeUserCards } from "../store/slices/userCardsSlice";

interface CardProps {
    card:CardT
}

function Card({card}:CardProps) {
    const [sliderValue,setSliderValue] = useState(0)
    const [showCredits,setShowCredits]= useState(false)
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
                <div className="card-number">{card.number}</div>
                <div className="card-processor">{card.paymentSystem}</div>
                {showCredits ? (
                    <div className="card-cridentials">
                        <div className="card-processor">{card.expiredDate}</div>
                        <div className="card-processor">{card.cvv}</div>
                    </div>
                ):(
                    <input type="range" min={0} max={100} value={sliderValue} onMouseOut={()=>{checkSlider()}} onChange={(e)=>{setSliderValue(Number(e.target.value))}}/>
                )}
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
  