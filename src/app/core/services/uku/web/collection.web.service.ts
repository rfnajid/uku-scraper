import { Injectable } from '@angular/core';
import { CollectionResponse, CollectionRecord, CollectionPath} from 'app/core/model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebService } from './web.service';
import { CaseWebService } from './case.web.service';

@Injectable({
  providedIn: 'root'
})

export class CollectionWebService extends WebService implements CaseWebService{

  CASE_URL = this.BASE_URL + 'colCase/listColCaseDO';


  getRecordUrl(product: string, caseId: string): string {
    return this.BASE_URL + 'colRecord/' + caseId + '/' + product + '/listColRecordDODatas';

    // // mock
    // return 'https://run.mocky.io/v3/d57bf0e3-f85b-4ee8-9857-72fedf3ea136';
  }

  getPictureUrl(product: string, customerId: string): string{
    return this.BASE_URL + 'customerPicture/' + customerId + '/' + product + '/pictures';

    // //mock
    // return 'https://run.mocky.io/v3/fe76e7d2-5959-46f1-8470-f048f4c586cc';
  }

  getPathUrl(caseId: string){
    return this.BASE_URL + 'colAllotTrack/' + caseId + '/listColAllotTrackDODatas';

    // // mock
    // return 'https://run.mocky.io/v3/3262b890-bd57-4a23-893a-c95ef3bcf358';
  }

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

    return this.http.post<CollectionResponse>(this.CASE_URL, body.toString(), this.formUrlOptions);
  }

  getDetail(): Observable<any> {
    throw new Error("Method not implemented.");
  }

  getRecords(product: string, caseId: string): Observable<CollectionRecord[]>{
    const body = new URLSearchParams();
    body.set('page', '1');
    body.set('rows', '1000');

    return this.http.post<CollectionRecord[]>(this.getRecordUrl(product, caseId), body.toString(), this.formUrlOptions);
  }

  getPictures(product: string, customerId: string): Observable<String[]>{
    return this.http.get<String[]>(this.getPictureUrl(product, customerId));
  }

  getPaths(caseId: string): Observable<CollectionPath[]>{
    const body = new URLSearchParams();
    body.set('page', '1');
    body.set('rows', '1000');

    return this.http.post<CollectionPath[]>(this.getPathUrl(caseId), body.toString(), this.formUrlOptions);
  }

}