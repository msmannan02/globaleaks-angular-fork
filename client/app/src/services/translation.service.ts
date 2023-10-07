import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppDataService } from "../app-data.service";
import { PreferenceResolver } from "../shared/resolvers/preference.resolver";
import {UtilsService} from "../shared/services/utils.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: "root",
})
export class TranslationService {

  language = "";

  constructor(
    // public preferenceResolver: PreferenceResolver,
    // public translateService: TranslateService,
    // public appDataService: AppDataService,
    // public appConfigService: AppConfigService,
    // private router: Router,
    // public utilsService:UtilsService
  ) {
  }

  onInit(changedLanguage: string) {
  }

  onChange(changedLanguage: string) {
    // this.language = changedLanguage;
    // this.translateService.use(this.language).subscribe(() => {
    //   this.translateService.getTranslation(this.language).subscribe();
    // });
  }
}
