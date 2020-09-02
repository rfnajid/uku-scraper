import { Injectable } from '@angular/core';
import { CollectionResponse} from '../../../model/response/collection.response.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from './web.service';
import { CaseWebService } from './case.web.service';
import { ContactResponse } from '../../../model';

@Injectable({
  providedIn: 'root'
})

export class ContactWebService extends WebService{

  constructor(private http: HttpClient) {
    super();
  }

  getContactUrl(product: string, customerId: string){
    // return this.BASE_URL + 'colEmergencyContact/' + product + '/' + customerId + '/listEmergencyContact';
    // mock
    return 'https://run.mocky.io/v3/376cbcd6-7197-4ef1-b64d-f0992a14b204';
  }

  getAll(product: string, customerId: string): Observable<ContactResponse>{
    const body = new URLSearchParams();
    body.set('page', '1');
    body.set('rows', '1000');

    return this.http.post<ContactResponse>(this.getContactUrl(product,customerId), body.toString(), this.formUrlOptions);
  }

}