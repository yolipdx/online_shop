import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../shared/product.model";
import {MemberService} from "../../../../shared/member.service";

@Component({
  selector: 'app-shop-list-item',
  templateUrl: './shop-list-item.component.html',
  styleUrls: ['./shop-list-item.component.css']
})
export class ShopListItemComponent implements OnInit {
  @Input() product: Product;
  @Input() amount: number;

  amountRange = [];
  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.amountRange.length = +this.amount + 1;
  }

  countWantedChanged(count: number) {
      this.memberService.updateShoppingChart(this.product, count);
    this.memberService.cartStatus.next('updated one item');
  }

  deleteItem(productItem: Product) {
    this.memberService.removeFromShoppingChart(productItem);

    this.memberService.cartStatus.next('removed one item');
  }

}
