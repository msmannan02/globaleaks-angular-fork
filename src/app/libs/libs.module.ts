import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InternationalizationComponent } from './internationalization/internationalization.component';
import { LibsRoutingModule } from './libs-routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SelectComponent } from './select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InternationalizationComponent,
    QrCodeComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    LibsRoutingModule,
    QRCodeModule,
    NgSelectModule,
  ],
})
export class LibsModule {}
