import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/productos/products.service';
import { Product } from 'src/productos/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product: Product;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.id = params.id);
    this.product = this.productService.getProduct(Number(this.id));
  }

}
