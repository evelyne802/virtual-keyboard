import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  function getCurrentTheme(){
    let theme = window.matchMedia('(prefers-color-scheme: dark)').
    matches? 'dark' : 'light';
    console.log(theme);
  }