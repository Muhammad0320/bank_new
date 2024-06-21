import { Subjects } from "../Subjects";
export interface TxnCardCreatedEvent {
    subject: Subjects.TxnCardCreated;
    data: {
        id: string;
        version: number;
        cardId: string;
        amount: number;
        reason?: string;
        account: {
            id: string;
            userId: string;
            version: number;
            balance: number;
        };
        beneficiary: {
            id: string;
            userId: string;
            version: number;
            balance: number;
        };
    };
}
