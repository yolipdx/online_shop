import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../shared/product.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  // @Output('filter') filterEvent = new EventEmitter<String>();
  // @Output('search') searchEvent = new EventEmitter<String>();


  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  sort(type: string) {
    // emit event to main window --> product window
    console.log('filter:  ' + type);
    // this.filterEvent.emit(type);
    // this.productService.
    this.productService.sortItem.next(type);
  }

  search(name: string) {
    // this.searchEvent.emit(name);
    this.productService.searchItem.next(name);

  }
}
