import { Collection } from "./collection.model";
import { Payment } from "./payment.model";
import { Contact } from "./contact.model";
import { CollectionRecord } from "./collectionRecord.model";
import { PaymentRecord } from "./paymentRecord.model";
import { CollectionPath } from "./collectionPath.model";

export class Template {
    case: Collection | Payment;
    detail: any;
    contacts: Contact[];
    collectionRecords: CollectionRecord[];
    pictures: String[];
    paymentRecords: PaymentRecord[];
    colelctionPaths: CollectionPath[];
}