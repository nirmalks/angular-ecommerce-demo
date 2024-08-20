import { inject} from "@angular/core";
import {  ResolveFn } from "@angular/router";
import { ProductsService } from "../products.service";
import { Observable } from "rxjs";

export const MobilesResolver:  ResolveFn<any> = (): Observable<any> => {
  const productsService: ProductsService = inject(ProductsService)
  return productsService.getProducts();
}
