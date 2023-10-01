import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthenticationService} from "../../../../../services/authentication.service";
import {PreferenceResolver} from "../../../../resolvers/preference.resolver";
import {AppConfigService} from "../../../../../services/app-config.service";
import {UtilsService} from "../../../../services/utils.service";
import {AppDataService} from "../../../../../app-data.service";
import {TranslationService} from "../../../../../services/translation.service";
import {TranslateService} from "@ngx-translate/core";
import {HttpService} from "../../../../services/http.service";

@Component({
  selector: 'views-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(public httpService: HttpService, public appConfigService: AppConfigService, public translateSersvice: TranslateService, private cdr: ChangeDetectorRef,public translateService: TranslationService ,public authentication: AuthenticationService, public preferences:PreferenceResolver, public appConfig: AppConfigService, public utils: UtilsService, public appDataService:AppDataService, public translationService:TranslationService) {
  }

  onChangeLanguage() {
    this.cdr.detectChanges();
    this.translationService.onChange(this.translationService.language)
    this.appConfigService.reinit(false)
  }
}
