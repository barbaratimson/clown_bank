import { createSlice } from "@reduxjs/toolkit"

const userCardsSlice = createSlice({
    name: 'userCards',
    initialState:{
        userCards:[]
    },
    reducers:{
        changeUserCards(state, action) {
            state.userCards = action.payload
        }
    }
})


export const { changeUserCards } = userCardsSlice.actions
export default userCardsSlice.reducer