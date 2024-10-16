import { routes } from './app/app.routes';
/// <reference types="@angular/localize" />

// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));



  import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';  // Import this for HttpClient
import { Router, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // This provides HttpClient globally
    provideRouter(routes),
    HttpClientModule, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ],
}).catch((err) => console.error(err));
