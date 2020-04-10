import { Component, OnInit } from '@angular/core';
import { Product } from '../../../productos/Product';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../productos/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productos: Product[];
  findings: Product[];
  newMonitoreados: number[];

  productSubscription = new Subscription();

  searchInput = '';
  mode: string;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.mode = this.router.url;
    if (this.router.url === '/product') {
      this.productos = this.productService.getProducts();

      this.productService.productsSubject.subscribe((data) => {
        this.productos = data;
        this.search();
    });
    } else {
      this.productos = this.productService.getMonitoreados().map((item) => this.productService.getProduct(item));

      this.productService.monitoreoSubject.subscribe((data) => {
        this.productos = data.map((item) => this.productService.getProduct(item));
        this.search();
      });
    }


  }

  ngOnInit(): void {
    this.newMonitoreados = [];
  }

  search() {
    this.findings =  this.productos.filter((item) => item.nombre.toUpperCase().includes(this.searchInput.toUpperCase()) ||
    item.descripcion.toUpperCase().includes(this.searchInput.toUpperCase()));

  }

  productChange(prod: any) {
    if (prod.state) {
      this.newMonitoreados.push(prod.id);
    } else {
      const index = this.newMonitoreados.findIndex((item) => item === prod.id);
      this.newMonitoreados.splice(index, 1);
    }
  }

  addNewMonitoreo() {
    this.newMonitoreados.forEach((item) => {
      this.productService.addMonitoreo(item);
    });
  }

}
