import { createSlice } from "@reduxjs/toolkit"
import { BankAccountT } from "../../utils/types"

interface userAccountsState {
    userAccounts:Array<BankAccountT>
  }

const initialState:userAccountsState = {
    userAccounts:[]
}


const userAccountsSlice = createSlice({
    name: 'userAccounts',
    initialState,
    reducers:{
        changeUserAccounts(state, action) {
            state.userAccounts = action.payload
        }
    }
})


export const { changeUserAccounts } = userAccountsSlice.actions
export default userAccountsSlice.reducer