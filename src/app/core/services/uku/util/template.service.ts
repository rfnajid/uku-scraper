import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class TemplateService {

    constructor(){

    }

    get (data: any) : string {
        let html = '<!DOCTYPE html><html>';
        html += this.head();
        html += this.body(data);
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
            background: #d4d7dd;\
        }\
        .value {\
            background: #f6f6f6;\
        }\
        .label, .value{\
            border-bottom: 1px solid #111111;\
        }\
        </style>';
    }

    private body(data): string{
        let body = '<body>';
        body += '<div class="container-fluid">';

        Object.entries(data).forEach(
            ([key, value]) => {
                body += this.content(key,value);
        });

        body+='</body>';

        return body;
    }

    private content(title, data): string{
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




}