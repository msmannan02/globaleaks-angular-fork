import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from "./src/app.module";

platformBrowserDynamic().bootstrapModule(AppModule, {
  preserveWhitespaces: true
}).catch(err => console.log(err));