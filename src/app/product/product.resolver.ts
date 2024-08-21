import { inject} from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { ProductsService } from "../products.service";
import { Observable } from "rxjs";

export const ProductResolver:  ResolveFn<any> = (route: ActivatedRouteSnapshot): Observable<any> => {
  const productsService: ProductsService = inject(ProductsService);
  const productName = route.paramMap.get('productName');
  return productsService.getProduct(productName);
}
