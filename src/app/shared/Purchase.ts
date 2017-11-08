import {Address} from "./Address";

export class Purchase {
  cardTYpe: string;
  cardNumber: string;
  csv: string;
  expDate: string;
  billingAddr: Address;
  holderName: string;

  constructor(cardTYpe: string = '',
              cardNumber: string = '',
              csv: string = '',
              expDate: string = '',
              billingAddr: Address = new Address(),
              holderName: string = '') {
    this.cardTYpe = cardTYpe;
    this.cardNumber = cardNumber;
    this.csv = csv;
    this.expDate = expDate;
    this.billingAddr = billingAddr;
    this.holderName = holderName;
  }
}
