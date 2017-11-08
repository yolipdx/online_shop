import {Injectable, OnInit} from '@angular/core';
import { Product } from './product.model';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ProductService implements OnInit {
  private readonly PAGE_SIZE: number = 12;
  private _products = [];
  private _popularProducts: Product[] = [];
  private _from: number;
  private _to: number;
  private activeProduct: Product;

  searchItem = new Subject<String>();
  sortItem = new Subject<String>();


  constructor() {
    this.initProducts();
    this._from = 0;
    this._to = 16;
  }

  ngOnInit(): void {
  }

  initProducts() {

    const name1 = ['food', 'food', 'food', 'food'];
    /* create sample data */
    const sampleUrl = [
      'assets/img/1.jpg', 
      'assets/img/2.jpg',
      'assets/img/3.jpg',
      'assets/img/4.jpg',
      'assets/img/5.jpg',
      'assets/img/6.jpg',
      'assets/img/7.jpg',
      'assets/img/8.jpg',
      'assets/img/9.jpg',
      'assets/img/10.jpg',
      'assets/img/11.jpg',
      'assets/img/12.jpg',
      'assets/img/13.jpg',
      'assets/img/14.jpg',
      'assets/img/15.jpg',
      'assets/img/16.jpg',
     ];

    const des = 'Granddaughter loves these organic bananas.';

    for (let i = 0; i < this.PAGE_SIZE; ++i) {
      const id = i;
      const name = name1[Math.floor(name1.length * Math.random())];
      const price =  Math.floor(100 * Math.random());
      const amount = Math.ceil(20 * Math.random());
      const desc = des;
      const imgIndex = i; //Math.floor(Math.random() * (sampleUrl.length));
      const img = sampleUrl[imgIndex];
      const kind = '零食';
      const weight = '100g';
      this._products.push(new Product(i.toString(),
        name,
        price,
        amount,
        weight,
        desc,
        img,
        kind,
        Math.ceil(5 * Math.random()),
        new Date(),
        Math.floor(100 * Math.random()),
        Math.floor(2 * Math.random()) === 1));
    }


    for (let i = 0; i < 8; ++i) {
      this._popularProducts.push(this._products[i]);
    }

  }

  products() {
    return this._products;
  }

  popularPorduct() {
    return this._popularProducts;
  }

  from() {
    return this._from;
  }

  to() {
    return this._to;
  }

  setAativeProduct(product: Product) {
    this.activeProduct = product;
  }

  getActiveProduct() {
    return this.activeProduct;
  }





}
