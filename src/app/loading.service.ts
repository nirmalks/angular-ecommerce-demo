import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  isLoading() {
    this.loadingSubject.next(true);
  }

  loaded() {
    this.loadingSubject.next(false);
  }
}
