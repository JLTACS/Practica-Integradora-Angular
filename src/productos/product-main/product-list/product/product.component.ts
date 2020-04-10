import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../productos/Product';
import { ProductsService } from '../../../../productos/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() checkState = new EventEmitter();
  boxState: boolean;
  mode: string;

  constructor(private productService: ProductsService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.mode = this.router.url;
  }

  changeState() {
    this.checkState.emit({id: this.product.uid, state: this.boxState});
  }

  eliminate() {
    if (this.mode === '/monitoreo') {
      this.productService.deleteMonitoreado(this.product.uid);
    } else if (this.mode === '/product') {
      this.productService.deleteProduct(this.product.uid);
      this.productService.deleteMonitoreado(this.product.uid);
    }
  }

}
