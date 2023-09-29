import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent {

  @Input() type: string = '';
  @Input() action: any;
  @Input() product: Product = {name:'', price:0}


  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, Validators.required]
  })

  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.type=="update"){
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price
      })
    }
  }

  onSubmit() {
    this.action(this.productForm);
  }

  
}
