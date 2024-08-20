import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductsService } from '../products.service';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductComponent,
    ProductsListComponent,
    ProductsRoutingModule,
  ],
  providers: [ ProductsService]
})
export class ProductsModuleModule { }
