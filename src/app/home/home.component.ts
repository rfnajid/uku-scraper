import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionWebService } from 'app/core/services/uku/web/collection.web.service';
import { PaymentWebService } from 'app/core/services/uku/web/payment.web.service';
import { CaseWebService} from 'app/core/services/uku/web/case.web.service';
import {PRODUCTS, DATA_CATEGORIES} from '../core/const/const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products = PRODUCTS;
  dataCategories = DATA_CATEGORIES.data;

  product = this.products[0];
  dataCategory = this.dataCategories[0].value;
  message = '';

  constructor(
    private router: Router,
    private collectionWebService: CollectionWebService,
    private paymentWebService: PaymentWebService ) {
  }

  ngOnInit(): void {
    this.getTotalCase();
  }

  setMessage(message: string){
    this.message = message;
  }

  clearMessage(){
    this.message = '';
  }

  getTotalCase(){

    let caseWebService: CaseWebService;

    if (this.dataCategory === DATA_CATEGORIES.COLLECTION) {
      caseWebService = this.collectionWebService;
    } else if (this.dataCategory === DATA_CATEGORIES.PAYMENT){
      caseWebService = this.paymentWebService;
    } else {
      return;
    }

    caseWebService.getSample(this.product).subscribe(res => {
      this.setMessage(res.total + ' data found');
    });
  }
}

