import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionWebService } from 'app/core/services/uku/web/collection.web.service';
import { PaymentWebService } from 'app/core/services/uku/web/payment.web.service';
import { TemplateService } from 'app/core/services/uku/util/template.service';
import { FileService } from 'app/core/services/uku/util/file.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  progress = "0%";
  done = false;
  message = "Lorem ipsum doleris sit amet";

  dataSize;

  constructor(
    private router: Router,
    private collectionWebService: CollectionWebService,
    private paymentWebService: PaymentWebService,
    private templateService: TemplateService,
    private fileService: FileService) {
  }

  ngOnInit(): void {
    this.download();
  }

  async download(){

    const list = await this.collectionWebService.getContoh().toPromise();

    this.dataSize = list.length;

    this.fileService.mkdir('percobaan');

    for(let i=0;i<this.dataSize;i++){
      const path = 'percobaan/'+list[i].id+'-'+list[i].kata;
      this.fileService.mkdir(path);

      const html = this.templateService.get({'TES':list[i],"tes 2":list[i]});

      await this.write(path + '/index.html', html);
      this.calculateProgress(i+1);
    };

    this.done = true;
  }

  async write(path: string, data:string){
    this.message = 'downloading... '+path;
    await new Promise(resolve => setTimeout(() => resolve(), 10));
    this.fileService.writeFile(path, data);
    console.log('write : ', path);
  }

  calculateProgress(current){
    const percentage = current/this.dataSize * 100;
    this.progress = Math.floor(percentage+0.9) +'%';
  }



}

