import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/bootstrap/app.component';
import { appConfig } from 'app/bootstrap/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
);
