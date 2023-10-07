import {
  Injectable,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UtilsService } from "../shared/services/utils.service";
import {AppConfigService} from "./app-config.service";
<<<<<<< Updated upstream
import {AppDataService} from "../app-data.service";
import {PreferenceResolver} from "../shared/resolvers/preference.resolver";
=======
import {ServiceInstanceService} from "../shared/services/service-instance.service";
>>>>>>> Stashed changes

@Injectable({
  providedIn: "root",
})
export class TranslationService {

<<<<<<< Updated upstream
  language=""
  onInit(changedLanguage:string) {
    this.language = changedLanguage
    if(this.preferenceResolver.dataModel){
      this.translateService.setDefaultLang(this.preferenceResolver.dataModel.language);
    }else {
      this.translateService.setDefaultLang(this.language);
    }
  }

  onChange(changedLanguage:string) {
    this.language = changedLanguage
    let page = this.appDataService.page
=======
  language = "";

  public utilsService:UtilsService
  public appConfigService: AppConfigService

  constructor(
    private serviceInstanceService:ServiceInstanceService,
    public preferenceResolver: PreferenceResolver,
    public translateService: TranslateService,
    public appDataService: AppDataService,
    private router: Router,
  ) {
  }

  init(){
    this.utilsService = this.serviceInstanceService.utilsService
    this.appConfigService = this.serviceInstanceService.appConfigService
  }
>>>>>>> Stashed changes

    this.translateService.use(this.language).subscribe(() => {
      this.translateService.getTranslation(this.language).subscribe(() => {
        this.utilsService.reloadCurrentRoute()
      });
    });
  }

  constructor(
      public preferenceResolver: PreferenceResolver,
      public translateService: TranslateService,
      public appDataService:AppDataService,
      public utilsService: UtilsService,
  ) {

  }
}
