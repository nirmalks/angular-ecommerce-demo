import { Component, inject, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ProductsService } from '../products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, AsyncPipe,RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products: Observable<any> = of(null);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() : void {
    this.products = this.route.data.pipe(map(data => {
      return data['mobiles'];
    }));
  }
}
