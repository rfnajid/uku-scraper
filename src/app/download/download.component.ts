import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService,TemplateService,CollectionWebService,PaymentWebService, ContactWebService, ScraperService } from 'app/core/services';
import {  Collection, Payment, CollectionRecord, PaymentRecord, CollectionPath, Template } from 'app/core/model';
import { PRODUCTS, DATA_CATEGORIES } from 'app/core/const/const';
import { removeQueryParams } from 'app/core/const/util';

import * as moment from 'moment';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  private progress = 0;
  done = false;
  message = "Lorem ipsum doleris sit amet";

  // total step for each item, it used on progress calculation
  totalStep = 8;

  casesSize: number = 100;
  product: string = PRODUCTS[0];
  category: string = DATA_CATEGORIES.PAYMENT;

  cases: Collection[] | Payment[];

  constructor(
    private router: Router,
    private fileService: FileService,
    private templateService: TemplateService,
    private collectionWebService: CollectionWebService,
    private paymentWebService: PaymentWebService,
    private contactWebService: ContactWebService,
    private scraperService: ScraperService
    ) {
      if(this.router.getCurrentNavigation().extras.state){
        this.product = this.router.getCurrentNavigation().extras.state.product;
        this.category = this.router.getCurrentNavigation().extras.state.category;
      }
  }

  ngOnInit(): void {
    this.download();
  }

  async testScrapPaymentDetail(){

    const html = await this.paymentWebService.getDetail(null,null).toPromise();

    const result = this.scraperService.scrapPaymentDetail(html, new Payment());
    console.log('testScrapPaymentDetail', result);
  }

  async download(){

    this.message = 'scraping cases ' + this.category;

    if (this.category === DATA_CATEGORIES.COLLECTION){
      this.cases = await (await this.collectionWebService.getAll(this.product).toPromise()).rows;
    } else if(this.category === DATA_CATEGORIES.PAYMENT){
      this.cases = await (await this.paymentWebService.getAll(this.product).toPromise()).rows;
    } else {
      return;
    }

    this.casesSize = this.cases.length;

    // BASE FOLDER
    const baseFolder = 'UKU-Scraper ' + moment().toISOString();
    this.fileService.mkdir(baseFolder);


    for(let i=0;i<this.casesSize;i++){
      let case_ : any = this.cases[i];

      let detail: any;

      if(this.category === DATA_CATEGORIES.PAYMENT){
        this.stepUp(i, 1, 'scraping detail : '+this.paymentWebService.getDetailUrl(case_.caseId, case_.scheduleId+''));
        const html = await this.paymentWebService.getDetail(case_.caseId, case_.scheduleId+'').toPromise();
        const scrapResult = this.scraperService.scrapPaymentDetail(html, case_);
        case_ = scrapResult.payment;

        detail = scrapResult.paymentDetail;
        console.log('detail : ', detail);
      }

      const template = new Template();
      template.case = case_;
      template.detail = detail;


      this.stepUp(i,2,'scraping contact : '+this.contactWebService.BASE_URL);
      template.contacts = await (await this.contactWebService.getAll(this.product, case_.customerId).toPromise()).rows;

      this.stepUp(i,3,'scraping collection records : '+this.collectionWebService.getRecordUrl(this.product, case_.orderId));
      template.collectionRecords = await this.collectionWebService.getRecords(this.product, case_.orderId).toPromise();

      this.stepUp(i,4,'scraping pictures : '+this.collectionWebService.getPictureUrl(this.product, case_.customerId));
      template.pictures = removeQueryParams(await this.collectionWebService.getPictures(this.product, case_.customerId).toPromise());

      this.stepUp(i,5,'scraping payment records : '+this.paymentWebService.getRecordUrl(this.product, case_.caseId+''));
      template.paymentRecords = await this.paymentWebService.getRecords(this.product, case_.caseId+'').toPromise();

      this.stepUp(i,6,'scraping collection path : '+this.collectionWebService.getPathUrl(case_.caseId + ''));
      template.colelctionPaths = await this.collectionWebService.getPaths(case_.caseId+'').toPromise();

      const html = this.templateService.get(template);

      this.stepUp(i, 7, 'saving item ' + (i+1));
      const filePath = baseFolder + '/' + case_.customerName + '-' + case_.caseId + '.html';
      await this.write(filePath, html);

      this.stepUp(i,8,'saving item '+(i+1)+' is done!');
    }

    this.done = true;
  }

  stepUp(i, step, message){
    this.message = message;
    this.calculateProgress(i, step);
  }


  async write(path: string, data:string){
    this.message = 'downloading... '+path;
    await new Promise(resolve => setTimeout(() => resolve(), 10));
    this.fileService.writeFile(path, data);
    console.log('write : ', path);
  }

  calculateProgress(current, step){
    this.progress = (step/this.totalStep + current)/this.casesSize * 100;
  }

  get progressText(): string{
    return this.progress.toFixed(2) + '%';
  }
}

