import { Injectable } from '@angular/core';
import { Login} from '../../../model/login.model';
import { LoginResponse } from '../../../model/response/login.response.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {WebService} from './web.service';

@Injectable({
  providedIn: 'root'
})

export class LoginWebService extends WebService{

  LOGIN_URL = this.BASE_URL + 'login?language=en_US';
  CAPTCHA_URL = this.BASE_URL + 'captcha';

  constructor(private http: HttpClient) {
    super();
  }

  captcha(): Observable<Blob>{
    return this.http.get(this.CAPTCHA_URL,  { responseType: 'blob'});
  }

  login(data: Login): Observable<LoginResponse>{
    console.log('Login : ',data);

    const body = new URLSearchParams();
    body.set('username',data.username);
    body.set('password',data.password);
    body.set('captcha', data.captcha);

    return this.http.post<LoginResponse>(this.LOGIN_URL, body.toString(), this.formUrlOptions);
  }
}