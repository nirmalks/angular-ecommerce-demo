import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  products: Observable<any> = of(null);
  dataSource: any[] = [];
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.products = this.route.data.pipe(map(data => {
      return data["mobiles"];
    }));

    this.products.subscribe((mobiles) => {
      this.dataSource = mobiles;
    });
  }

  displayedColumns: string[] = ['position', 'name', 'brand', 'price'];

}
