import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from '../loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, RouterModule, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [RouterModule, MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  @Input()
  routing: boolean = false;

  @Input()
  detectRoutingOngoing: boolean = false

  constructor(public loadingService: LoadingService, private router: Router) {

  }
  ngOnInit(): void {
    if(this.detectRoutingOngoing) {
      this.router.events.subscribe(
        (event: any) => {
        if (event instanceof NavigationStart
          || event instanceof RouteConfigLoadStart) {
           this.loadingService.isLoading();
         }
         else if (
             event instanceof NavigationEnd ||
             event instanceof NavigationError ||
               event instanceof NavigationCancel ||
               event instanceof RouteConfigLoadEnd) {
             this.loadingService.loaded();

         }
        }
      );
     }
    }

}
