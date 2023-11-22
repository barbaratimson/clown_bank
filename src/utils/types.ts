export type pageType = "myAccounts" | "people"
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

export interface CardT {
    number:string,
    userAccountId:number
    expiredDate:string
    releaseDate:string
    cvv:number
    paymentSystem: Processor
    blocked: boolean
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

export interface Notification {
    message: string,
    timestamp: string
    userUniqueNumber: string,
    type: string

}