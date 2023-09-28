import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  
  prod: Product = {
    name: '',
    price: 0
  }

  constructor(private route: ActivatedRoute, private prodService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.prodService.getProduct(+params.get('id')!)
      })
    ).subscribe({
      next: prod => this.prod = prod,
      error: err => console.log(err)
    })
  }

  edit() {
    console.log('hola')
  }

}
