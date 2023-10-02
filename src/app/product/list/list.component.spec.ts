import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ProductService } from 'src/app/service/product.service';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/interfaces';

xdescribe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let productServiceStub: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

    TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    });

    productServiceStub = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get products', () => {
     const mockProducts: Product[] = [
       { id: 1, name: 'Product 1', price: 100 },
       { id: 2, name: 'Product 2', price: 200 },
       { id: 3, name: 'Product 3', price: 300 }
     ]
     productServiceStub.getProducts.and.returnValue(of(mockProducts));
     component.ngOnInit();
     expect(component.products).toEqual(mockProducts);
  })

  it('should handle error when fetching products', () => {

    const errorMessage = "Error fetching products";
    productServiceStub.getProducts.and.returnValue(throwError(errorMessage));
    spyOn(console, 'error')

    // productServiceStub.getProducts.and.returnValue(of([]));
    component.ngOnInit();
    expect(component.products).toEqual([]);
    //expect(console.error).toHaveBeenCalledWith('Error fetching products');
  })
});
