import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionWebService } from 'app/core/services/uku/web/collection.web.service';
import { PaymentWebService } from 'app/core/services/uku/web/payment.web.service';
import {PRODUCTS, DATA_CATEGORIES} from '../core/const/const';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  message = "Lorem ipsum doleris sit amet";

  constructor(
    private router: Router,
    private collectionWebService: CollectionWebService,
    private paymentWebService: PaymentWebService ) {
  }

  ngOnInit(): void {
  }

  // view related functions

}

