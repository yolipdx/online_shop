import { Injectable }               from '@angular/core';
import { Http, Headers, Response}   from '@angular/http';
import 'rxjs/Rx';
import { LogInfo }                  from './loginfo';
import { Product } from "./product.model";
import { Subject } from "rxjs/Subject";


@Injectable()
export class MemberService {
  private profileUrl = 'http://localhost:5678/profile';
  cart: {product: Product, amount: number}[] = [];

  cartStatus = new Subject();

  constructor(private http: Http) { }

  // return a observable object waiting for subscribe
  verify(loginInfo: LogInfo) {
    const headers = new Headers({'Content-Type': 'application/json'});
    console.log(loginInfo);
    return this.http.post(this.profileUrl, loginInfo, {headers: headers})
      .map(
        (response: Response) => {
          const data = response.json();
          console.log('verify status: ' + data['status']);
          return data['status'];
        }
      );
  }

  register(loginInfo: LogInfo) {
    const headers = new Headers({'Content-Type': 'application/json'});
    console.log(loginInfo);
    return this.http.post(this.profileUrl, loginInfo, {headers: headers})
            .map(
                (response: Response) => {
                  const data: string = response.json();
                  console.log('register status: ' + data['status']);
                  return data['status'];
                }
            );
  }

  putIntoCart(product: Product, amount: number) {
    this.cart.push({product: product, amount: amount});
  }

  fetchCart() {
    return this.cart;
  }

  removeFromShoppingChart(productItem: Product) {
    for (let i = 0; i < this.cart.length; ++i) {
      if (this.cart[i].product === productItem) {
        return this.cart.splice(i, 1);
      }
    }
    return 'not find';
  }

  updateShoppingChart(productItem: Product, amount: number) {
    for (let i = 0; i < this.cart.length; ++i) {
      if (this.cart[i].product === productItem) {
          this.cart[i].amount = amount;
      }
    }
    return 'not find';
  }

}

