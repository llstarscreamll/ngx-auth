import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthUser } from '../models/authUser';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './../../core/services/local-storage.service';
import { Observable } from 'rxjs/Observable';
import { AbstractService } from './../../core/services/abstract.service';
import { tokenNotExpired } from 'angular2-jwt';

import { AccessToken } from './../interfaces/accessToken';
import { Account } from './../models/account';

@Injectable()
export class AuthService extends AbstractService {

  protected API_ENDPOINT = 'v1/user';
  public loginRoute = 'v1/clients/web/admin/login';
  public registerRoute = 'v1/register';
  public loginFromLocalStorage = false;

  public constructor(
    private http: Http,
    private localStorageService: LocalStorageService
  ) {
    super();
  }

  public checkIfDomainExists(subdomain: string): Observable<string> {
    const endPoint = this.domain + 'v1/' + 'check-if-subdomain-exists';

    return this.http
      .post(endPoint, { subdomain: subdomain }, { headers: this.headers })
      .map(res => { return res.json(); })
      .catch(this.handleError);
  }

  /**
   * Process the login request to the API.
   */
  public login(email: string, password: string): Observable<AccessToken> {
    this.loginFromLocalStorage = false;
    const endPoint = this.domain + this.loginRoute;
    this.addDomainHeader();

    return this.http
      .post(endPoint, { 'email': email, 'password': password }, { headers: this.headers })
      .map(res => {
        const accessToken: AccessToken = res.json();
        return accessToken;
      })
      .catch(this.handleError);
  }

  /**
   * Register user.
   * @param account
   */
  public registerUser(account: Account): Observable<any> {
    const endPoint = this.domain + this.registerRoute;

    return this.http
      .post(endPoint, account, { headers: this.headers })
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  /**
   * Make an API call to retrive the authenticated user.
   */
  public getUser(): Observable<AuthUser> {
    this.setAuthorizationHeader();

    return this.http
      .get(this.domain + 'v1/userinfo', { headers: this.headers })
      .map(res => Object.assign(new AuthUser, res.json().data))
      .catch(this.handleError);
  }

  /**
   * Checks if there is a valid token.
   */
  public loggedIn(): boolean {
    // are there a token and is a valid token?
    return tokenNotExpired('token', this.localStorageService.getToken());
  }

  /**
   * Logs out the user from the API.
   */
  public logout(): Observable<any> {
    this.setAuthorizationHeader();

    return this.http
      .post(this.domain + 'v1/logout', {}, { headers: this.headers })
      .map(res => { return res.json().message })
      .catch(this.handleError);
  }
}
