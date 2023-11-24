import React, {useEffect, useState} from "react";
import {BankAccountT, pageType} from "../utils/types";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import axios, {AxiosError, AxiosResponse} from "axios";
import {wait} from "@testing-library/user-event/dist/utils";
import {changeUserAccounts} from "../store/slices/userAccountsSlice";

const link = process.env.REACT_APP_APIGATEWAY_LINK
const token = localStorage.getItem("token")
interface TransferProps {
    account:BankAccountT,
}


function History({account}:TransferProps) {
    const [history,setHistory] = useState<any>()
    const transactionHistory = async (number:string) => {
        try {
            const response = await axios.get(
                `${link}/transaction/${number}`,{
                    headers:{
                        "Authorization" : token
                    }
                });
            setHistory(response.data)
        } catch (err) {
            console.error('Ошибка при получении списка треков:', err);
            console.log(err)
        }
    };

    useEffect(() => {
        transactionHistory(account.number)
    }, [account]);
    return (
        <div className="transfer-wrapper">
            {history && history?.length !== 0 ? history.map((transaction:any) => (
                <>
                {JSON.stringify(transaction)}
                </>
            )):(
                <div>
                    There is no transactions
                </div>
            )

            }
        </div>
    );
}

export default History;