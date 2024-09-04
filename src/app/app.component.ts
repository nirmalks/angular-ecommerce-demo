import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';
import { LoadingComponent } from "./loading/loading.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthStoreService } from './auth-store.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatMenuModule, MatButtonModule, HomeComponent, RouterModule, LoadingComponent ,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-ng';

  constructor() {
  }
}
