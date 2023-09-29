import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/service/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent {

  constructor(private productService: ProductService,
              private toast: ToastrService,
              private router: Router) { }

  addProduct(form: FormGroup) {
    console.log('hola desde del padre')
    const product: Product = {
      name: form.value.name!,
      price: form.value.price!
    }
    this.productService.addProduct(product).subscribe({
      next: () => {
        form.reset();
        this.toast.success('Product added successfully','Product',{timeOut:3000, positionClass: 'toast-bottom-center'});
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
  }

  // addProduct() {
  //   console.log('hola desde del padre')
  //   const product: Product = {
  //     name: this.newProductForm.value.name!,
  //     price: this.newProductForm.value.price!
  //   }
  //   this.productService.addProduct(product).subscribe({
  //     next: () => {
  //       this.newProductForm.reset();
  //       this.toast.success('Product added successfully','Product',{timeOut:3000, positionClass: 'toast-bottom-center'});
  //       this.router.navigate(['/home']);
  //     },
  //     error: (err) => {
  //       this.toast.error(err.error.message);
  //     }
  //   })
  // }
  
}
