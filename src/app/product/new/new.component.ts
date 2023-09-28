import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  // name: string = '';
  // price: number = 0;

  newProductForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [null, Validators.required]
  })

  constructor(private productService: ProductService,
              private toast: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.addProduct();
  }

  addProduct() {
    const product: Product = {
      name: this.newProductForm.value.name!,
      price: this.newProductForm.value.price!
    }
    this.productService.addProduct(product).subscribe({
      next: () => {
        this.newProductForm.reset();
        this.toast.success('Product added successfully');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
  }
}
