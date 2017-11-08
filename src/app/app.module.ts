import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

// import { SwiperModule } from 'angular2-useful-swiper';
// import { HttpClientModule } from "@angular/common/http";
import { HttpModule }       from '@angular/http';
import { ProductService }   from "./shared/product.service";
import { MemberService } from './shared/member.service';
import { RouterModule } from "@angular/router";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShowcaseComponent } from './content-window/showcase/showcase.component';
import { MainWindowComponent} from './content-window/mainwindow/mainwindow.component';
import { FilterComponent } from './content-window/mainwindow/filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './content-window/mainwindow/product/product.component';
import { ProductdetailComponent } from './content-window/mainwindow/productdetail/productdetail.component';
import { ContentWindowComponent } from './content-window/content-window.component';
import { ShoppingCartComponent } from './content-window/mainwindow/shopping-cart/shopping-cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ShopListItemComponent } from './content-window/mainwindow/shopping-cart/shop-list-item/shop-list-item.component';
import { DeliveryComponent } from './content-window/mainwindow/delivery/delivery.component';
import { AdministratorComponent } from './administrator/administrator.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowcaseComponent,
    MainWindowComponent,
    FilterComponent,
    FooterComponent,
    ProductComponent,
    ProductdetailComponent,
    ContentWindowComponent,
    ShoppingCartComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    ShopListItemComponent,
    DeliveryComponent,
    AdministratorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxCarouselModule,
    HttpModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: ContentWindowComponent
        },
        { path: 'login',
          component: LoginComponent
        },
        { path: 'admin',
          component: AdminComponent
        },
        {
          path: 'product-detail',
          component: ProductdetailComponent
        },
        {
          path: 'shopping-cart',
          component: ShoppingCartComponent
        },
        {
          path: 'delivery',
          component: DeliveryComponent
        },
        {
          path: 'adminBackEnd',
          component: AdministratorComponent
        }

      ]

    ),
  ],
  providers: [MemberService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
