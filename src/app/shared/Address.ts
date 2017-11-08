export class Address {
  line1: string;
  line2: string;
  post: number;
  city: string;
  state: string;
  county: string;


  constructor(line1: string = '',
              line2: string = '',
              post: number = 0,
              city: string = '',
              state: string = '',
              county: string = '') {
    this.line1 = line1;
    this.line2 = line2;
    this.post = post;
    this.city = city;
    this.state = state;
    this.county = county;
  }

}
