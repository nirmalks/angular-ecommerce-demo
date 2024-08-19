
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() {
  }
}
