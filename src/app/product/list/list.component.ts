import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  products: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts()
  }

  listProducts() {
    this.productService.getProducts().subscribe({
      next: products => {
      this.products = products
      console.log(products)
    },
      error: error => {
        console.error(error)
      }
    });
  }

}
