import { Component, OnDestroy, OnInit} from '@angular/core';
import { MemberService }               from "../../../shared/member.service";
import { ProductService }              from "../../../shared/product.service";
import { Product }                     from "../../../shared/product.model";
import { Router }                      from "@angular/router";
import { Subscription }                from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
cart: {product: Product, amount: number}[];
  totalPrice: number = 0;
  cartStatusSubscription: Subscription;
  cartEmpty: boolean = true;

  constructor(
                private memberService: MemberService,
                private productService: ProductService,
                private router: Router
              ) { }

  ngOnInit() {
    // fetch product list in the cart.
    this.cart = this.memberService.fetchCart();
    this.cartEmpty = this.cart.length === 0;

    if (!this.cartEmpty) {
      this.totalPrice = this.cart.map((item) => item.product.price * item.amount).reduce((acc, cur) => acc + cur);
    }

    this.cartStatusSubscription = this.memberService.cartStatus.subscribe(
      (status: String) => {
        console.log('carts status changed: ' + status);
        this.cart = this.memberService.fetchCart();
        this.cartEmpty = this.cart.length === 0;
        if (this.cartEmpty) {
          this.totalPrice = 0;
        } else {
          this.totalPrice = this.cart.map((item) => item.product.price * item.amount).reduce((acc, cur) => acc + cur);
        }
      }
    );
  }

  submit() {
    this.router.navigate(['/delivery']);
  }

  onShopping() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.cartStatusSubscription) {
      this.cartStatusSubscription.unsubscribe();
    }
  }
}
