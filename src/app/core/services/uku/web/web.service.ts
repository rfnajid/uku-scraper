import { HttpHeaders } from '@angular/common/http';

export class WebService {

  public BASE_URL = '/';

  public formUrlOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  }

  constructor() {
  }

}
