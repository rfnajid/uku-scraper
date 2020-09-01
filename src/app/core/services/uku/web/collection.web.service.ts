import { Injectable } from '@angular/core';
import { CollectionResponse} from '../../../model/response/collection.response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from './web.service';
import { CaseWebService } from './case.web.service';

@Injectable({
  providedIn: 'root'
})

export class CollectionWebService extends WebService implements CaseWebService{

  COLLECTION_URL = this.BASE_URL + 'colCase/listColCaseDO';

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
    body.set('queue', 'COLLECTION');
    body.set('product', product);

    return this.http.post<CollectionResponse>(this.COLLECTION_URL, body.toString(), this.formUrlOptions);
  }

  getDetail(): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getContoh(): Observable<any[]> {
    return this.http.get<any[]>('https://run.mocky.io/v3/e00cf9d5-0b70-43b9-80fd-65b2e74f6b68');
  }

}