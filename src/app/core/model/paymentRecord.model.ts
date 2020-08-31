export class PaymentRecord{
    id: number;
    caseId: bigint;
    orderId: bigint;
    customerId: bigint;
    scheduleId: number;
    operatorId: string;
    operatorName: string;
    amount: number;
    refundDetail: string;
    flowNo: string;
    refundType: string;
    paymentType: string;
    repayStatus: string;
    errorCode: string;
    errorMessage: string;
    updateTime: string;
    createTime: string;
    remark: string;
}