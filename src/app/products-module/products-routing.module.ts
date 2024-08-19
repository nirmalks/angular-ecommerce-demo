import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from "../products-list/products-list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
      path: "",
      component: ProductsListComponent
  },
  {
    path: "**",
    component: ProductsListComponent
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
