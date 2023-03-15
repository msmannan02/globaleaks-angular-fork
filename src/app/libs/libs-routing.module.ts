import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternationalizationComponent } from './internationalization/internationalization.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { SelectComponent } from './select/select.component';

const routes: Routes = [
  {
    path: 'i18a',
    component: InternationalizationComponent,
    pathMatch: 'full',
  },
  {
    path: 'qr-code',
    component: QrCodeComponent,
    pathMatch: 'full',
  },
  {
    path: 'select',
    component: SelectComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibsRoutingModule {}
