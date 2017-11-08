import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { ProductManagerModel } from '../../shared/productManager.model';
import {Product} from "../../shared/product.model";
import {ProductService} from "../../shared/product.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-mainwindow',
  templateUrl: './mainwindow.component.html',
  styleUrls: ['./mainwindow.component.css']
})
export class MainWindowComponent implements OnInit, OnDestroy {
  @Output('showProductDetailFired') showProductDetailEvent = new EventEmitter();

  searchItemSubscrition = new Subscription();
  sortItemSubscribtion = new Subscription();

  showProductDetail = false;

  // products should be bound to data service --> server
  products: Product[];
  from: number;
  to: number;
  displayProduct = this.products;
  selectedProduct: Product;

  // layout row item count:
  gridWidth: number;
  gridHeight: number;
  xRange: number[] = [];
  yRange: number[] = [];
  cellWidth: number;
  //products

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    // products should be bound to data service --> server
    this.products = this.productService.products();
    this.displayProduct = this.products;

    this.from = this.productService.from();
    this.to   = this.productService.to();

    // layout row item count:
    this.gridWidth  = 4;
    this.gridHeight = Math.floor(1 + (this.to + 1 - this.from) / this.gridWidth);   // floor !!!!
    this.cellWidth  = Math.floor(12 / this.gridWidth);


    // set length
    this.xRange.length = this.gridWidth;
    this.yRange.length = this.gridHeight;


    this.searchItemSubscrition = this.productService.searchItem.subscribe(
      (name: string) => {
        this.onSearch(name);
      }

    );

    this.sortItemSubscribtion = this.productService.sortItem.subscribe(
      (name: string) => {
        this.onSort(name);
      }
    );
  }

  onProductClick (productKey: string) {
    console.log('product ' + productKey + ' selected');
    // this.showProductDetail = true;

    this.selectedProduct = this.products[productKey];

    console.log(this.showProductDetail);

    // this.showProductDetailEvent.emit(productKey);

    // use  service
    this.productService.setAativeProduct(this.selectedProduct);

    // use router
    console.log('--> detail product');
    this.router.navigate(['/product-detail']);
  }

  onSearch(name: string) {
    console.log("main-window search: " + name);
    console.log("display product " + this.displayProduct);
    console.log(this.products.length);
    this.displayProduct = this.products.filter(item => item.name.includes(name));
  }

  onSort(type: string) {
     console.log(' need to sort by ' + type);

     const sortFunc = { score:     'onSortByScore',
                        date:      'onSortByDate',
                        amount:    'onSortBySales',
                        recommend: 'onFilterRecommand'};

     this[sortFunc[type]]();
  }


  onSortByDate() {
    this.displayProduct = this.products;
    this.displayProduct.sort((item1, item2) => item2.uploadDate.valueOf() - item1.uploadDate.valueOf());
  }

  onSortByScore() {
    this.displayProduct = this.products;
    this.displayProduct.sort((item1, item2) => item2.score - item1.score);
  }

  onSortBySales() {
    this.displayProduct = this.products;
    this.displayProduct.sort((item1, item2) => item2.soldAmount - item1.soldAmount);
  }

  onFilterRecommand() {
    this.displayProduct = this.products.filter(item => item.recomand);
  }


  ngOnDestroy(): void {
    this.sortItemSubscribtion.unsubscribe();
    this.searchItemSubscrition.unsubscribe();
  }


}
