import { Observable } from "rxjs";
import { WrapperResponse } from "../../../model/response/wrapper.response.model";

export interface CaseWebService {
    getSample(product: string): Observable<WrapperResponse>;
    getAll(product: string, rows: number): Observable<WrapperResponse>;
}