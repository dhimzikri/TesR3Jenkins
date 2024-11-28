import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';

if (environment.production) {
  enableProdMode();
}

fetch('assets/config/enviConfig.json').then(response => {
  response.json().then(config => {
    // Cache list env to storage
    URLConstant.config = config;
    localStorage.setItem('envi', JSON.stringify(config));
    // Object.assign(envi, config);
    platformBrowserDynamic().bootstrapModule(AppModule);
  })
}).catch(err => {
  console.log('err', err);
})
