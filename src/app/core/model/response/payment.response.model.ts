import { Payment } from "../payment.model";
import { WrapperResponse } from "./wrapper.response.model";

export class PaymentResponse implements WrapperResponse{
    page: number;
    total: number;
    records: number;
    rows: Payment[];
    userdata: string;
}