import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  name: string;
  img: string;
  price: number;
  amount: number;
  kind: string;
  recommend: string;

  info: string;

  constructor() { }

  ngOnInit() {
  }

}
