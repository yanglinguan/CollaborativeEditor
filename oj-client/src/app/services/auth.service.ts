import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  // it can be substribe by others, 
  // when it changes, it will notify ones that substribe it
  userProfile = new BehaviorSubject<any>(undefined);

  auth0 = new auth0.WebAuth({
    clientID: 'lHR16HgaWpNE0mVJiocYlZlHJYOfQRti',
    domain: 'yanglinguan.auth0.com',
    responseType: 'token id_token',
    audience: 'https://yanglinguan.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000',      
    scope: 'openid profile'
  });

  constructor(public router: Router) { 
    // initially, if there is profile in the local storage
    // directly set user profile
    this.userProfile.next(JSON.parse(localStorage.getItem('profile')));
  }

  public login(): void {
    this.auth0.authorize();
  }

  // parse hash in url
  // need to all in app.component
   public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile()
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  public getProfile(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        // update userProfile
        self.userProfile.next(profile);
        // store to localStorage
        localStorage.setItem('profile', JSON.stringify(profile));
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile')
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }



}
