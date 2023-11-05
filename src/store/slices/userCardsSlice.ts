import { createSlice } from "@reduxjs/toolkit"
import { CardT } from "../../utils/types"

interface CardsState {
    userCards:Array<CardT>
  }

const initialState:CardsState = {
    userCards:[]
}

const userCardsSlice = createSlice({
    name: 'userCards',
    initialState,
    reducers:{
        changeUserCards(state, action) {
            state.userCards = action.payload
        }
    }
})


export const { changeUserCards } = userCardsSlice.actions
export default userCardsSlice.reducer

