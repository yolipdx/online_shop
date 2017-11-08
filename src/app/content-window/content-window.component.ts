import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ProductManagerModel} from '../shared/productManager.model';
import {MainWindowComponent} from './mainwindow/mainwindow.component';

@Component({
  selector: 'app-content-window',
  templateUrl: './content-window.component.html',
  styleUrls: ['./content-window.component.css']
})
export class ContentWindowComponent implements OnInit {
  @ViewChild('mainWindow') private mainWindow: MainWindowComponent;

  // or match the first one（type match）
  //@ViewChild(MainWindowComponent) private mainWindow: MainWindowComponent;


  private dataManager = ProductManagerModel.getInstance();
  products = this.dataManager.products;
  @Input('show-which') showComponent = 'showMainWindow';
  // showDetailWindow || showShoppingCart

  hideShowCase = false;

  detailProductKey: string;
  selectedProduct: any;

  constructor() { }

  ngOnInit() {
  }

  onShowDetail(productKey: string) {
    this.detailProductKey = productKey;
    this.selectedProduct = this.products[productKey];
    this.showComponent = 'showDetailWindow';
  }

  onShowShoppingCart() {
    console.log('show shopping cart now');
    this.showComponent = 'showShoppingCart';
  }

  onSearch(name: string) {
    console.log("content-window search: " + name);
    // console.log(JSON.stringify(this.mainWindow));
    this.mainWindow.onSearch(name);
  }

}
