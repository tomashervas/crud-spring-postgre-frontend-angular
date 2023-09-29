import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent implements OnInit {

  @Input() product: Product = {name:'', price:0}

  constructor(private productService: ProductService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    // console.log(this.product)
  }

  updateProduct(form: FormGroup){
    this.product.name = form.value.name;
    this.product.price = form.value.price;
    
    this.productService.updateProduct(this.product.id!, this.product).subscribe({
      next: () => {
        form.reset();
        this.toast.success('Product updated successfully','Product',{timeOut:3000, positionClass: 'toast-bottom-center'});
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })



  }

}
