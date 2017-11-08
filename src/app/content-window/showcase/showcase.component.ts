import { Component, OnInit } from '@angular/core';
import { ProductManagerModel} from '../../shared/productManager.model';
import { Product} from '../../shared/product.model';
import { NgxCarousel} from 'ngx-carousel';
import {ProductService} from "../../shared/product.service";
import {Router} from "@angular/router";
// import { ICarouselConfig, AnimationConfig} from 'angular4-carousel';


@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  // product: Product[] = ProductManagerModel.getInstance().popularPorduct();
  product: Product[] = [];
  carouselOne: NgxCarousel;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.product = this.productService.popularPorduct();
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 3, lg: 4, all: 0},
      slide: 1,
      speed: 1000,
      interval: 2000,
      point: {
        visible: true
      },
      load: 3,
      touch: true,
      loop: true,
      custom: 'banner',
    };



  }

  onclick(productClicked: Product) {
    console.log("clicked");
    this.productService.setAativeProduct(productClicked);
    this.router.navigate(['/product-detail']);
  }

}
