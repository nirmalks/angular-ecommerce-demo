import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from "../products-list/products-list.component";
import { Component, NgModule } from "@angular/core";
import { MobilesResolver } from "../mobiles/mobile.resolver";
import { ProductComponent } from "../product/product.component";
import { ProductResolver } from "../product/product.resolver";
import { ProductReviewsComponent } from "../product-reviews/product-reviews.component";
import { ProductQuestionsComponent } from "../product-questions/product-questions.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";

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
    component: ProductComponent,
    resolve: {product: ProductResolver},
    children: [
      {
        path: "",
        component: ProductDetailComponent,
      },
      {
        path: 'product-reviews',
        component: ProductReviewsComponent,
      },
      {
        path: 'product-questions',
        component: ProductQuestionsComponent,
      }
    ]
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
