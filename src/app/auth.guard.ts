import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from './auth-store.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthStoreService);
  const router = inject(Router);
  return auth.isLoggedIn$.pipe(
    map(loggedIn => {
      return loggedIn ? true : router.parseUrl('/login');
    }

    )
  );
};
