import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[];
  monitoreados: number[];
  marcas: string[];

  productsSubject = new BehaviorSubject<Product[]>([]);
  monitoreoSubject = new BehaviorSubject<number[]>([]);

  constructor() {
    this.products = [new Product(1, 'Smarthphone', 'Motorola', 'Quadcore 3GHZ', 12018.5, 5,
                      [new Especificacion('memoria ram', 4, 'GB'),
                        new Especificacion('memoria interna', 64, 'GB'),
                        new Especificacion('SO', 'android 9', '')]),
                    new Product(2, 'Smartwatch', 'Xaomi', '3rd Generation, 3GB Ram', 799.99, 0, []),
                    new Product(3, 'Smart TV', 'Samsung', '60 pulgadas, Wifi', 100560.99, 3, [])];
    this.monitoreados = [2];
    this.productsSubject.next(this.getProducts());
    this.monitoreoSubject.next(this.getMonitoreados());
    this.marcas = ['Motorola', 'Xaomi', 'Samsung', 'LG', 'Nokia'];
   }

  getProducts() {
    return this.products.slice();
  }

  getMonitoreados() {
    return this.monitoreados.slice();
  }

  getMarcas() {
    return this.marcas.slice();
  }

  addProduct(newProduct: Product) {
    this.products.push(newProduct);
    this.productsSubject.next(this.getProducts());
  }

  addMonitoreo(newId: number) {
    if (!this.monitoreados.includes(newId)) {
      this.monitoreados.push(newId);
      this.monitoreoSubject.next(this.getMonitoreados());
    }
  }

  deleteProduct(delId: number) {
    let index = this.products.findIndex((item) => item.uid === delId);
    this.products.splice(index, 1);
    this.productsSubject.next(this.getProducts());

    index = this.monitoreados.findIndex((item) => item === delId);
    if (index !== -1) {
      this.monitoreados.splice(index, 1);
      this.monitoreoSubject.next(this.getMonitoreados());
    }
  }

  deleteMonitoreado(delId: number) {
    const index = this.monitoreados.findIndex((item) => item === delId);
    if (index !== -1) {
      this.monitoreados.splice(index, 1);
      this.monitoreoSubject.next(this.getMonitoreados());
    }
  }

  updateProduct(editProduct: Product) {
    const index = this.products.findIndex((item) => item.uid === editProduct.uid);
    this.products[index] = editProduct;
    this.productsSubject.next(this.getProducts());
  }

  getProduct(prId: number) {
    const index = this.products.findIndex((item) => item.uid === prId);
    return JSON.parse(JSON.stringify(this.products[index]));
  }
}
