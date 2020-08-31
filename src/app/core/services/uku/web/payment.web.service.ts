import { Injectable } from '@angular/core';
import { Login} from '../../../model/login.model';
import { LoginResponse } from '../../../model/response/login.response.model';
import { CollectionResponse} from '../../../model/response/collection.response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from './web.service';
import { CaseWebService } from './case.web.service';

@Injectable({
  providedIn: 'root'
})

export class PaymentWebService extends WebService implements CaseWebService{

  PAYMENT_URL = this.BASE_URL + 'paidoff/datas';

  constructor(private http: HttpClient) {
    super();
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
}

