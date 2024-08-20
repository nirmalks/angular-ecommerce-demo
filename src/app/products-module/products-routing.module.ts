import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from "../products-list/products-list.component";
import { Component, NgModule } from "@angular/core";
import { MobilesResolver } from "../mobiles/mobile.resolver";
import { ProductComponent } from "../product/product.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsListComponent,
    pathMatch: "full"
  },
  {
    path: "mobiles",
    component: ProductsListComponent,
    resolve: { mobiles: MobilesResolver },
    pathMatch: "full"
  },
  {
    path: 'mobiles/:productName',
    component: ProductComponent
  },

];

@NgModule({
imports: [
    RouterModule.forChild(routes)
],
exports: [RouterModule],
providers: [

]
})
export class ProductsRoutingModule {

}
