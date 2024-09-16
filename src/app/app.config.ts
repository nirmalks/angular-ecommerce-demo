import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withHashLocation, withInMemoryScrolling, withNavigationErrorHandler, withPreloading, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,
    withPreloading(PreloadAllModules),
    // withDebugTracing(),
    withHashLocation(),
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled'
    }),
    withRouterConfig({
      paramsInheritanceStrategy: 'always'
    }),
  ), provideClientHydration(), provideAnimationsAsync(),  importProvidersFrom(HttpClientModule)]
};
