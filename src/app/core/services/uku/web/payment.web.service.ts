import { Injectable } from '@angular/core';
import { Login} from '../../../model/login.model';
import { LoginResponse } from '../../../model/response/login.response.model';
import { CollectionResponse} from '../../../model/response/collection.response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from './web.service';
import { CaseWebService } from './case.web.service';
import { PaymentRecord } from 'app/core/model';

@Injectable({
  providedIn: 'root'
})

export class PaymentWebService extends WebService implements CaseWebService{

  // PAYMENT_URL = this.BASE_URL + 'paidoff/datas';
  //// mock url
  PAYMENT_URL = 'https://run.mocky.io/v3/ac00a6ce-ad12-4819-be36-06db74adf4e4';

  getRecordUrl(product: string, caseId: string): string {
    // return this.BASE_URL + 'colRepayFlow/' + caseId + '/listColRepayFlowDODatas';
    // mock
    return 'https://run.mocky.io/v3/c03db519-4910-46f0-9363-fc812792603d';
  }

  constructor(private http: HttpClient) {
    super();
  }

  getDetailUrl(caseId: bigint, scheduleId: number): string{
    // return this.BASE_URL + 'paidoff/' + caseId + '/' + scheduleId + '/paidOffDetail';
    // mock
    return 'https://run.mocky.io/v3/15c17851-3004-44b4-a576-3a7816f4ff88';
  }

  getSample(product: string): Observable<CollectionResponse>{
    return this.getAll(product,1);
  }

  getAll(product: string, rows = 0): Observable<CollectionResponse>{
    const body = new URLSearchParams();
    body.set('page', '1');
    body.set('rows', rows+"");
    body.set('product', product);

    return this.http.post<CollectionResponse>(this.PAYMENT_URL, body.toString(), this.formUrlOptions);
  }

  getDetail(): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getRecords(product: string, caseId: string): Observable<PaymentRecord[]>{
    const body = new URLSearchParams();
    body.set('page', '1');
    body.set('rows', '1000');

    return this.http.post<PaymentRecord[]>(this.getRecordUrl(product, caseId), body.toString(), this.formUrlOptions);
  }
}

