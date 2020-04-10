import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, Especificacion } from 'src/productos/Product';
import { ProductsService } from 'src/productos/products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id: number;
  product: Product;
  mode: string;
  marcas: string[];

  newAtr = '';
  newValue = '';
  newUnity = '';

  @ViewChild('f') form: NgForm;

  constructor(private router: Router,
              private productService: ProductsService,
              private route: ActivatedRoute) {
    this.mode = this.router.url;
    this.marcas = this.productService.getMarcas();
   }

  ngOnInit(): void {
    console.log(this.mode);
    if (this.mode !== '/product/new') {
      this.route.params.subscribe((params) => this.id = params.id);
      this.product = this.productService.getProduct(Number(this.id));
    } else {
      let indices: number[];
      indices = this.productService.getProducts().map((item) =>  item.uid);
      this.product = new Product(Math.max(...indices) + 1, '', '', '', 0, 0, []);
    }
  }

  addEspecificacion() {
    this.product.especificacion.push(new Especificacion(this.newAtr, this.newValue, this.newUnity));
  }

  eliminateEspecificacion(index) {
    this.product.especificacion.splice(index, 1);
    console.log(this.product.especificacion);
  }

  validar() {
    if (this.mode !== '/product/new') {
      return this.product.precio >= 0 && this.product.existencia >= 0;
    } else {
      return this.product.precio >= 0 && this.product.existencia >= 0 && !this.validarIndex();
    }
  }

  validarIndex() {
    return this.productService.getProducts().map((item) => item.uid).includes(this.product.uid);
  }

  submit(forma: NgForm) {
    if (this.mode === '/product/new') {
      this.productService.addProduct(this.product);
      this.router.navigate(['/product']);
    } else {
      this.productService.updateProduct(this.product);
    }
  }

}
