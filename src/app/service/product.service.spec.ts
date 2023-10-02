import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../interfaces';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ]

  const mockProduct: Product = {
    id: 1,
    name: 'Product 1',
    price: 100
  }

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should get products', () => {
    productService.getProducts().subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });
    
    const req = httpTestingController.expectOne(productService.productUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get a product by id', () => {
    const productId = 1;
    productService.getProduct(productId).subscribe((product: Product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(`${productService.productUrl}/detail/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should add a product', () => {
    productService.addProduct(mockProduct).subscribe((response) => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne(`${productService.productUrl}/new`);
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should update a product', () => {
    const productId = 1;
    productService.updateProduct(productId, mockProduct).subscribe((response) => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne(`${productService.productUrl}/${productId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a product', () => {
    const productId = 1;
    
    productService.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne(`${productService.productUrl}/${productId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

});
