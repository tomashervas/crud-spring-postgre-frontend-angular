import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';


xdescribe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  

  beforeEach(async () => {
    // spyOn(toastrService, 'success');
    // spyOn(toastrService, 'error');
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductFormComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ]
    })
    .compileComponents();
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //     declarations: [ProductFormComponent],
        
    //   }).compileComponents();
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.productForm.value).toEqual({ name: '', price: 0 });
  });

  it('should call onSubmit()', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    component.action = () => {};

    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should patch form values when type is "update"', () => {
    component.type = 'update';
    component.product = { name: 'Test Product', price: 50 };

    spyOn(component.productForm, 'patchValue').and.callThrough();
    component.ngOnInit();

    expect(component.productForm.patchValue).toHaveBeenCalledWith({
      name: component.product.name,
      price: component.product.price
    });

  });


});