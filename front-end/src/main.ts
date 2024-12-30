/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
if (typeof (document as any).createEvent !== 'function') {
  (document as any).createEvent = () => {
    return {
      initEvent: () => {}
    };
  };
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
