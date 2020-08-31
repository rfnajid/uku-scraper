import { Collection } from "../collection.model";
import { WrapperResponse } from "./wrapper.response.model";

export class CollectionResponse implements WrapperResponse{
    page: number;
    total: number;
    records: number;
    rows: Collection[];
    userdata: string;
}