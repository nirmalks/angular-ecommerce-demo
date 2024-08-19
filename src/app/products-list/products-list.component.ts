import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  @Input()
  products;

  constructor(productsService: ProductsService) {
    this.products = productsService.getProducts();
  }
}
