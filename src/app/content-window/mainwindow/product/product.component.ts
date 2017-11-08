import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() productSelect = new EventEmitter<Number>();

  constructor() {
  }


  ngOnInit() {
  }



}
