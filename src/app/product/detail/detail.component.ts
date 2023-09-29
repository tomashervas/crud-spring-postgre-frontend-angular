import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  confirmed: boolean = false
  showUpdate: boolean = false

  constructor(private route: ActivatedRoute,
              private prodService: ProductService,
              private router: Router,
) { }

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
    this.showUpdate = !this.showUpdate
  }

  delete() {
    this.confirmed = true
  }

  dismiss(){
    this.confirmed = false
  }
  
  confirmDelete(){
    this.prodService.deleteProduct(this.prod.id!).subscribe()
    this.router.navigate(['/home'])

  }


}
