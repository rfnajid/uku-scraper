import { Injectable } from '@angular/core';
import { LoginModel} from '../../model/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  BASE_URL = '/';
  LOGIN_URL = this.BASE_URL + 'login?language=en_US';
  CAPTCHA_URL = this.BASE_URL + 'captcha';

  constructor(private http: HttpClient) {
  }

  captcha(): Observable<Blob>{
    return this.http.get(this.CAPTCHA_URL,  { responseType: 'blob'});
  }

  login(data: LoginModel): Observable<any>{
    console.log('Login : ',data);

    const body = new URLSearchParams();
    body.set('username',data.username);
    body.set('password',data.password);
    body.set('captcha', data.captcha);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }

    return this.http.post(this.LOGIN_URL, body.toString(), options);
  }



}
