import { importProvidersFrom, isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routs';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';


bootstrapApplication(AppComponent, {
    providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(appRoutes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
})
  .catch(err => console.error(err));
