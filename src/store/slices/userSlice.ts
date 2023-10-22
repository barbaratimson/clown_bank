import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../utils/types"

interface UserState {
    user:User
  }

const initialState:UserState = {
    user:{
        uniqueUserId:"",
        firstName:"",
        lastName:"",
        patronymic:"",
        birthDate:"",
        userAccountsIds:[],
        phoneNumber:""
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        changeUser(state, action:PayloadAction<User>) {
            state.user = action.payload

        }
    }
})


export const { changeUser } = userSlice.actions
export default userSlice.reducer