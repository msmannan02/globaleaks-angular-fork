import {Injectable, OnInit} from '@angular/core';
import {HttpService} from "../shared/services/http.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilsService} from "../shared/services/utils.service";
import {AppDataService} from "../app-data.service";
import {FieldUtilitiesService} from "../shared/services/field-utilities.service";
import {TranslationService} from "./translation.service";
<<<<<<< Updated upstream
import {Route, Router,NavigationEnd, ActivatedRoute} from "@angular/router";
import {PreferenceResolver} from "../shared/resolvers/preference.resolver";
=======
import {Router,NavigationEnd, ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {ServiceInstanceService} from "../shared/services/service-instance.service";
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})
export class AppConfigService implements OnInit{
  public sidebar: string= '';
<<<<<<< Updated upstream
  initTranslation(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
=======
  public header_title: string= '';

  private translationService:TranslationService
  public authenticationService:AuthenticationService
  public utilsService:UtilsService

  constructor(private serviceInstanceService:ServiceInstanceService, private router: Router, private activatedRoute: ActivatedRoute, public appServices: HttpService, public translateService: TranslateService, public appDataService:AppDataService, public fieldUtilitiesService:FieldUtilitiesService)  {
  }

  init(){
    this.translationService = this.serviceInstanceService.translationService
    this.authenticationService = this.serviceInstanceService.authenticationService
    this.utilsService = this.serviceInstanceService.utilsService

    this.activatedRoute.paramMap.subscribe(params => {
      let currentURL = window.location.hash.substring(2).split("?")[0]; // Use window.location for full URL including query parameters
      this.initRoutes(currentURL)
      this.localInitialization()
    });
  }

  initRoutes(currentURL:string){
    if (this.authenticationService && this.authenticationService.session && currentURL != "login") {
      const queryParams = this.activatedRoute.snapshot.queryParams;
      let param = localStorage.getItem("default_language")
      if(param){
        queryParams['lang'] = param
      }

      if (this.authenticationService.session.role == "admin") {
        this.router.navigate(["/" + this.authenticationService.session.role], { queryParams }).then();
      } else if (this.authenticationService.session.role == "receiver") {
        this.router.navigate(["/recipient"], { queryParams }).then();
      } else if (this.authenticationService.session.role == "custodian") {
        this.router.navigate(["/custodian"], { queryParams }).then();
      }
    }else {
      localStorage.removeItem("default_language")
    }
>>>>>>> Stashed changes
  }

  public setHomepage() {
    location.replace("/");
  };

  public setPage(page:string){
    this.rootDataService.page = page
  }

  hello(){

  }

  private localInitialization(callback?: () => void){

    this.appServices.getPublicResource().subscribe({
      next: data => {
        this.rootDataService.public = data.body;

        //this.translateService.setDefaultLang(this.rootDataService.public.node.default_language);
        //this.translateService.use(this.rootDataService.public.node.default_language);
        //this.utilsService.routeCheck()

        let elem
        if (window.location.pathname === "/") {
          if (this.rootDataService.public.node.css) {
            elem = document.getElementById("load-custom-css");
            if (elem === null) {
              elem = document.createElement("link");
              elem.setAttribute("id", "load-custom-css");
              elem.setAttribute("rel", "stylesheet");
              elem.setAttribute("type", "text/css");
              elem.setAttribute("href", "s/css");
              document.getElementsByTagName("head")[0].appendChild(elem);
            }
          }

          if (this.rootDataService.public.node.script) {
            elem = document.getElementById("load-custom-script");
            if (elem === null) {
              elem = document.createElement("script");
              elem.setAttribute("id", "load-custom-script");
              elem.setAttribute("src", "script");
              document.getElementsByTagName("body")[0].appendChild(elem);
            }
          }

          if (this.rootDataService.public.node.favicon) {
            const element = window.document.getElementById("favicon");
            if (element !== null) {
              element.setAttribute("href", "s/favicon");
            }
          }
        }

        this.rootDataService.contexts_by_id = this.utilsService.array_to_map(this.rootDataService.public.contexts);
        this.rootDataService.receivers_by_id = this.utilsService.array_to_map(this.rootDataService.public.receivers);
        this.rootDataService.questionnaires_by_id = this.utilsService.array_to_map(this.rootDataService.public.questionnaires);


        this.rootDataService.submission_statuses = this.rootDataService.public.submission_statuses;
        this.rootDataService.submission_statuses_by_id = this.utilsService.array_to_map(this.rootDataService.public.submission_statuses);


        for (let [key, element] of Object.entries(this.rootDataService.questionnaires_by_id)) {
          this.fieldUtilitiesService.parseQuestionnaire(this.rootDataService.questionnaires_by_id[key], {})
          this.rootDataService.questionnaires_by_id[key].steps = this.rootDataService.questionnaires_by_id[key].steps.sort((a:any,b:any)=>a.order > b.order)
        }

        for (let [key, element] of Object.entries(this.rootDataService.contexts_by_id)) {
          this.rootDataService.contexts_by_id[key].questionnaire = this.rootDataService.questionnaires_by_id[this.rootDataService.contexts_by_id[key].questionnaire_id];
          if (this.rootDataService.contexts_by_id[key].additional_questionnaire_id) {
            this.rootDataService.contexts_by_id[key].additional_questionnaire = this.rootDataService.questionnaires_by_id[this.rootDataService.contexts_by_id[key].additional_questionnaire_id];
          }
        }

        this.rootDataService.connection = {
          "tor": data.headers["X-Check-Tor"] === "true" || location.host.match(/\.onion$/),
        };

        this.rootDataService.privacy_badge_open = !this.rootDataService.connection.tor;

        this.utilsService.routeCheck();

        this.rootDataService.languages_enabled = new Map<number, string>();
        this.rootDataService.languages_enabled_selector = [];
        this.rootDataService.languages_supported = new Map<number, string>();

        let self = this
        this.rootDataService.public.node.languages_supported.forEach(function(lang:any){
          self.rootDataService.languages_supported.set(lang.code, lang)

          if (self.rootDataService.public.node.languages_enabled.includes(lang.code)) {
            self.rootDataService.languages_enabled.set(lang.code, lang)
            self.rootDataService.languages_enabled_selector.push(lang);
          }
        });

<<<<<<< Updated upstream
        if(this.preferenceResolver.dataModel && this.preferenceResolver.dataModel.language){
          setTimeout(() => {
            this.glTranslationService.onChange(this.preferenceResolver.dataModel.language)
          }, 250);
        }else {
          this.glTranslationService.onChange(this.rootDataService.public.node.default_language)
=======
        let storageLanguage = localStorage.getItem("default_language")
        if(languageInit){
          if(!storageLanguage){
            storageLanguage = self.appDataService.public.node.default_language
            localStorage.setItem("default_language", storageLanguage)
          }
          this.translationService.onChange(storageLanguage)
>>>>>>> Stashed changes
        }

        this.setTitle()
        this.rootDataService.started = true;
        if(callback){
          callback()
        }
      }
    });
  }
  setTitle(){
    if (!this.rootDataService.public) {
      return;
    }

    let projectTitle = this.rootDataService.public.node.name, pageTitle = this.rootDataService.public.node.header_title_homepage;



    if (location.pathname !== "/") {
      pageTitle = "Globaleaks";
    }

    if(pageTitle.length>0){
      pageTitle = this.translateService.instant(pageTitle);
    }

    this.rootDataService.projectTitle = projectTitle !== "GLOBALEAKS" ? projectTitle : "";
    this.rootDataService.pageTitle = pageTitle !== projectTitle ? pageTitle : "";

    if (pageTitle && pageTitle.length>0) {
      pageTitle = this.translateService.instant("wow");
      window.document.title = projectTitle + " - " + pageTitle;
    } else {
      window.document.title = projectTitle;
    }

    let element = window.document.getElementsByName("description")[0]
    if (element instanceof HTMLMetaElement) {
      element.content = this.rootDataService.public.node.description;
    }
  }
  onRouteChange(){
    this.router.events.subscribe(() => {
      if(this.rootDataService.public.node){
        if (!this.rootDataService.public.node.wizard_done) {
          location.replace("/#/wizard");
        }
        else if(this.router.url == "/" && this.rootDataService.page == "signuppage"){
          location.replace("/#/signup")
        }
      }
    });
  }

<<<<<<< Updated upstream
  reloadRoute(newPath: string) {
    const promise = () => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigated = false;
      this.router.navigateByUrl(this.router.url).then(() => {
        if (newPath) {
          this.router.navigate([newPath], { replaceUrl: true });
        }
      });
    };
    this.localInitialization(promise)
=======
  loadAdminRoute(newPath: string) {
    this.appDataService.public.node.wizard_done = true
    this.appDataService.public.node.languages_enabled = []
    this.appDataService.public.node.name = "Globaleaks"

    this.router.navigateByUrl(newPath).then(() => {
      this.sidebar='admin-sidebar'
      this.setTitle()
    });
>>>>>>> Stashed changes
  }


  
  routeChangeListener() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.activatedRoute.firstChild?.snapshot;
        if (currentRoute?.data) {
          this.sidebar = currentRoute.data['sidebar'];
        }
      }
    });
  }

  reinit(){
    this.localInitialization()
    this.onRouteChange();
  }

  constructor(private preferenceResolver:PreferenceResolver, private router: Router,private activatedRoute: ActivatedRoute, public appServices: HttpService, public translateService: TranslateService, public utilsService:UtilsService, public rootDataService:AppDataService, public fieldUtilitiesService:FieldUtilitiesService, private glTranslationService:TranslationService)  {
    this.localInitialization()
    this.onRouteChange();
  }

  ngOnInit(): void {
  }
}
