import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {WebService} from '../core/services/uku/web.service';


@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  captcha: string;

  message = {
    'error': false,
    'message': ''
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private webService: WebService) {
      this.loginForm =  this.formBuilder.group({
        "username": ["", Validators.required],
        "password": ["", Validators.required],
        "captcha": ["", Validators.required]
      });
   }

  ngOnInit(): void {
    this.getCaptcha();
  }

  getCaptcha(){
    this.webService.captcha().subscribe(res => {
      this.createImageFromBlob(res);
    });
  }

  onLogin(event: Event) {
    event.preventDefault();
    this.webService.login(this.loginForm.value).subscribe(res => {
      console.log('Login result ', res);
      if(res.success && res.data === "/main"){
        this.router.navigate(['/home'])
      }else {
        this.error(res.errMsg);
      }
    });
  }

  error(message: string){
    this.message.error = true;
    this.message.message = message;
    this.getCaptcha();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      console.log('reader',reader);
       this.captcha = reader.result.toString().replace('text/xml','image/jpeg');
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
