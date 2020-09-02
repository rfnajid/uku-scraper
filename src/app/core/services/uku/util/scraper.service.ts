import { Injectable } from '@angular/core';

// import * as cheerio from 'cheerio';
import { PaymentDetailScrapResult, Payment } from 'app/core/model';

@Injectable({
    providedIn: 'root'
})

export class ScraperService {


    constructor(){
    }

    scrapPaymentDetail(html: string, payment: Payment): PaymentDetailScrapResult{
        const result = new PaymentDetailScrapResult();

        const script = html;

        const customerId = this.getVariableFromScript(script, 'var v_customerId = ');
        const orderId = this.getVariableFromScript(script, 'var v_orderId = ');

        payment.customerId = customerId.substring(1,customerId.length-1);
        payment.orderId = orderId.substring(1, orderId.length-1);
        result.payment = payment;

        const detail = this.getVariableFromScript(script, 'var detailMap=');
        result.paymentDetail = JSON.parse(detail);

        console.log('scraperService', result);

        return result;
    }

    private getVariableFromScript(script: string, variable: string): string{
        const removeFront = script.substring(script.search(variable)+variable.length, script.length);
        const result = removeFront.substring(0, removeFront.search(';'));
        return result;
    }
}