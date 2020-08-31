import { Contact } from "../contact.model";
import { WrapperResponse } from "./wrapper.response.model";

export class ContactResponse implements WrapperResponse{
    page: number;
    total: number;
    records: number;
    rows: Contact[];
    userdata: string;
}