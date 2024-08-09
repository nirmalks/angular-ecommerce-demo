import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import  mobiles from '../products';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts() {
    return of(mobiles);
  }
}
