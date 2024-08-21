import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import  mobiles from '../products';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProduct(productName: string | null): Observable<any> {
    return of(mobiles[0]);
  }

  constructor() { }

  getProducts(): Observable<any> {
    return of(mobiles);
  }
}
