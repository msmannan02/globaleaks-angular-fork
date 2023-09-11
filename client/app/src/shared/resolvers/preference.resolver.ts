import { Injectable } from '@angular/core';
import {
    Resolve, Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/http.service";
import {preferenceResolverModel} from "../../models/resolvers/preferenceResolverModel";

import {AuthenticationService} from "../../services/authentication.service";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PreferenceResolver implements Resolve<boolean> {
  dataModel: preferenceResolverModel = new preferenceResolverModel();

  constructor(
    private router: Router,
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(): Observable<boolean> {
    if (this.authenticationService.isSessionActive()) {
      return this.httpService.requestPreferenceResource().pipe(
        map((response: preferenceResolverModel) => {
          this.dataModel = response;
          if (this.dataModel.password_change_needed) {
            this.router.navigate(["/action/forcedpasswordchange"]);
          } else if (this.dataModel.require_two_factor) {
            this.router.navigate(["/action/forcedtwofactor"]);
          }
          return true;
        }),
        catchError(() => {
          return of(true);
        })
      );
    }
    return of(true);
  }
}
