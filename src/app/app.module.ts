import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductComponent } from 'src/productos/product-main/product-list/product/product.component';
import { ProductDetailComponent } from 'src/productos/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from 'src/productos/product-main/product-edit/product-edit.component';
import { ProductListComponent } from 'src/productos/product-main/product-list/product-list.component';
import { ProductMainComponent } from 'src/productos/product-main/product-main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
