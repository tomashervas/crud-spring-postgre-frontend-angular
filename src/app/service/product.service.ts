import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = 'http://localhost:9090/products';

  constructor(private httpClient: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  public getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.productUrl + '/detail/' + id);
  }

  public addProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.productUrl + '/new', product);
  }

  public updateProduct(id: number, product: Product): Observable<any> {
    return this.httpClient.put(this.productUrl + `/${id}`, product);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(this.productUrl + `/${id}`);
  }


}
