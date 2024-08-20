import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import  mobiles from '../products';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): Observable<any> {
    return of(mobiles);
  }
}
