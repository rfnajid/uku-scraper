import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService,TemplateService,CollectionWebService,PaymentWebService, ContactWebService } from 'app/core/services';
import {  Collection, Payment, CollectionRecord, PaymentRecord, CollectionPath, Template } from 'app/core/model';
import { PRODUCTS, DATA_CATEGORIES } from 'app/core/const/const';
import { removeQueryParams } from 'app/core/const/util';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  progress = "0%";
  done = false;
  message = "Lorem ipsum doleris sit amet";

  casesSize: number = 100;
  product: string = PRODUCTS[0];
  category: string = DATA_CATEGORIES.COLLECTION;

  cases: Collection[] | Payment[];

  constructor(
    private router: Router,
    private fileService: FileService,
    private templateService: TemplateService,
    private collectionWebService: CollectionWebService,
    private paymentWebService: PaymentWebService,
    private contactWebService: ContactWebService
    ) {
  }

  ngOnInit(): void {
    this.download();
  }

  async download(){

    if (this.category === DATA_CATEGORIES.COLLECTION){
      this.cases = await (await this.collectionWebService.getAll(this.product).toPromise()).rows;
    } else if(this.category === DATA_CATEGORIES.PAYMENT){
      this.cases = await (await this.paymentWebService.getAll(this.product).toPromise()).rows;
    } else {
      return;
    }

    this.casesSize = this.cases.length;

    // BASE FOLDER
    const baseFolder = 'UKU-Scraper ' + Date.now();
    this.fileService.mkdir(baseFolder);


    for(let i=0;i<this.casesSize;i++){
      let case_ : Collection | Payment = this.cases[i];
      let customerId;
      let caseId;
      if(case_ instanceof Collection){
        caseId = case_.orderId;
        customerId = case_.customerId;
      }
      if(case_ instanceof Payment){
        caseId = case_.caseId;
        customerId = null;
      }


      const template = new Template();
      template.case = case_;
      template.detail = {'tes': 'tes'};
      template.contacts = await (await this.contactWebService.getAll(this.product, customerId).toPromise()).rows;
      template.collectionRecords = await this.collectionWebService.getRecords(this.product, caseId).toPromise();
      template.pictures = removeQueryParams(await this.collectionWebService.getPictures(this.product, customerId).toPromise());
      template.paymentRecords = await this.paymentWebService.getRecords(this.product, caseId).toPromise();
      template.colelctionPaths = await this.collectionWebService.getPaths(caseId).toPromise();

      const html = this.templateService.get(template);

      const filePath = baseFolder + '/' + case_.customerName + '-' + caseId + '.html';
      await this.write(filePath, html);
      this.calculateProgress(i+1);
    }

    this.done = true;
  }


  async write(path: string, data:string){
    this.message = 'downloading... '+path;
    await new Promise(resolve => setTimeout(() => resolve(), 10));
    this.fileService.writeFile(path, data);
    console.log('write : ', path);
  }

  calculateProgress(current){
    const percentage = current/this.casesSize * 100;
    this.progress = Math.floor(percentage+0.9) +'%';
  }

}

