import { AsyncPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatButtonModule, AsyncPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product:any = of(null);
  discountCode: string;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  ngOnInit() : void {
    this.product = this.route.snapshot.data['product'];
    this.discountCode = this.route.snapshot.queryParamMap.get('discountCode')!;
  }

  canDeactivate(): boolean {
    return confirm(
        'Are you sure you want to leave? Some data may be lost.'
    );
  }
}
