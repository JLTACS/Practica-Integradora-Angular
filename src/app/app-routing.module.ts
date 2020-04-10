import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/home/home.component';
import { ProductMainComponent } from 'src/productos/product-main/product-main.component';
import { ProductDetailComponent } from 'src/productos/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from 'src/productos/product-main/product-edit/product-edit.component';
import { ProductListComponent } from 'src/productos/product-main/product-list/product-list.component';
import { NotFoundComponent } from 'src/not-found/not-found.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'monitoreo', component: ProductMainComponent,
    children: [{path: '', component: ProductListComponent}]},
  {path: 'product', component: ProductMainComponent,
    children: [
      {path: '', component: ProductListComponent},
      {path: 'new', component: ProductEditComponent},
      {path: ':id', component: ProductDetailComponent},
      {path: ':id/edit', component: ProductEditComponent}
    ]},
  {path: '**', component: NotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
