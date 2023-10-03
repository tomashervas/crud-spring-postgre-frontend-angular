import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { DetailComponent } from './detail.component';
import { ProductService } from 'src/app/service/product.service'

xdescribe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let router: Router;

  const mockProduct = {
    id: 1,
    name: 'Product 1',
    price: 10
  };

  const activatedRouteMock = {
    paramMap: of({get: () => mockProduct.id})
  }

  beforeEach(() => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProduct', 'deleteProduct']);
    
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ProductService, useValue: productServiceSpy },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router);
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product on ngOnInit', () => {
    productServiceSpy.getProduct.and.returnValue(of(mockProduct));

    component.ngOnInit();

    expect(productServiceSpy.getProduct).toHaveBeenCalledWith(1);
    expect(component.prod).toEqual(mockProduct);
  });
  
  it('should set confirmed to true on delete()', () => {
    component.delete();
    expect(component.confirmed).toBeTrue();
  });

  it('should set confirmed to false on dismiss()', () => {
    component.dismiss();
    expect(component.confirmed).toBeFalse();
  });

  it('should toggle showUpdate on edit()', () => {
    component.edit();
    expect(component.showUpdate).toBeTrue();

    component.edit();
    expect(component.showUpdate).toBeFalse();
  });

  it('should call productService.deleteProduct and navigate on confirmDelete()', () => {
    //  spyOn(component.router, 'navigate').and.stub()
    productServiceSpy.deleteProduct.and.returnValue(of({}));
    component.prod = mockProduct;
    component.confirmDelete();
    expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  })


});
