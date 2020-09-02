import { Injectable } from '@angular/core';
import { Template } from 'app/core/model';


@Injectable({
    providedIn: 'root'
})

export class TemplateService {

    constructor(){

    }

    get (template: Template) : string {
        let html = '<!DOCTYPE html><html>';
        html += this.head();
        html += this.body(template);
        return html;
    }

    private head (): string {
        return'<head>\
        <title>UKU Scraper</title>\
        <meta charset="utf-8">\
        <meta name="viewport" content="width=device-width, initial-scale=1">\
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">'
        + this.style() +
        '</head>';
    }

    private style(): string{
        return '<style>\
            .row > * {\
            padding: 10px;\
        }\
        .label {\
            background: rgba(0,0,0,.05);\
        }\
        .value {\
            background: #ffffff;\
        }\
        .label, .value{\
            border-bottom: 1px solid #111111;\
        }\
        img{\
            width:300px;\
        }\
        </style>';
    }

    private body(template: Template): string{
        let body = '<body>';
        body += '<div class="container-fluid">';

        body += this.contentObject('Detail',template.detail);
        body += this.contentObject('Case', template.case);
        body += this.contentArray('Contact', template.contacts);
        body += this.contentArray('Collection Records', template.collectionRecords);
        body += this.contentArray('Payment Records ', template.paymentRecords);
        body += this.contentArray('Collection Path', template.colelctionPaths);
        body += this.contentImages('Pictures', template.pictures);

        body+='</body>';

        return body;
    }

    private contentObject(title: string, data:): string{
        let content = '<h3>'+title+'</h3>';

        console.log('template -> content -> title', title);
        console.log('template -> content -> data', data);

        content += '<div class="row">';
        Object.entries(data).forEach(
            ([key, value]) => {
                content += '<div class="col-md-3 label">'+key+'</div>';
                content += '<div class="col-md-3 value">'+value+'</div>';
        });
        content += '</div>';

      return content;
    }

    private contentArray(title: string, data: any[]){
        let content = '<h3>'+title+'</h3>';

        console.log('template -> content -> title', title);
        console.log('template -> content -> data', data);

        if(data.length<=0){
            content += '<h5>No Data</h5>';
        }else {
            content += '<table class="table table-striped">';
            content += '<thead>';
            content += '<tr>';
            Object.entries(data[0]).forEach(
                ([key, value]) => {
                    content += '<th scope="col">'+ key +'</th>';
            });
            content += '</tr></thead>';
            content += '<tbody>';

            data.forEach(element => {
                content += '<tr>';
                Object.entries(element).forEach(
                    ([key, value]) => {
                        content += '<td>' + value +'</td>';
                });
                content += '</tr>';
            });
            content += '</tbody></table>';
        }

        return content;
    }

    private contentImages(title: string, data: String[]){
        let content = '<h3>'+ title + '</h3>';

        console.log('template -> content -> title', title);
        console.log('template -> content -> data', data);

        data.forEach(element => {
            content += '<img src="' + element + '"/>'
        });
    }




}