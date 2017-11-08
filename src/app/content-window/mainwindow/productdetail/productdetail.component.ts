import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Product} from '../../../shared/product.model';
import {ProductService} from "../../../shared/product.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {MemberService} from "../../../shared/member.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  // @Input() product: Product;
  // @Output() confirm = new EventEmitter();

  product: Product;
  amountRange: number[] = [];

  constructor(private productService: ProductService,
              private memberService: MemberService,
              private router: Router,
              private location: Location
  ) {

  }

  ngOnInit() {
    this.product = this.productService.getActiveProduct();
    this.amountRange.length = +this.product.amount;
    console.log('detail product to show: ' + this.product);
  }

  onConfirm() {
    // console.log("you want to buy: " + amount + "份");
    // put the prodcut into the user's shopping cart
    this.router.navigate(['/shopping-cart']);
  }

  onPutIntoCart(count: number) {
    this.memberService.putIntoCart(this.product, count);
  }


  onContinueShop() {
    this.location.back();
  }
}
