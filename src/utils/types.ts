export type pageType = "cards" | "accounts"
export type Currency = "$" | "RUB" | "YEN";
export type Processor = "VISA" | "MASTERCARD" | "MIR" | "МИР"
export type BankAccountType = "INVESTMENT" | "CHECKING" | "SAVING" | "DEPOSIT"
export interface BankAccountT {
    number:string,
    balance:number,
    currency:Currency,
    type:BankAccountType,
    active:Boolean
}

export interface User {
        uniqueUserId: string,
        firstName: string,
        lastName: string,
        patronymic?: string,
        userAccountsIds: Array<string>,
        birthDate: string,
        phoneNumber: string
}