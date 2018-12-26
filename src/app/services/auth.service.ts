import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, of, pipe, throwError} from 'rxjs';
import decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { share, map, tap} from 'rxjs/operators';
import { JwtHelper } from '../helpers/jwthelpers';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

	private message: string;
	baseUrl = 'http://infoflo.dyndns.org:8051/api';

  	constructor(
	  	private _router: Router, 
		private http: HttpClient,
		private decoder: JwtHelper
	) { }

	/**
	 * this is used to clear anything that needs to be removed
	 */
	clear(): void {
		localStorage.clear();
	}

	/**
	 * check for expiration and if token is still existing or not
	 * @return {boolean}
	 */
	isAuthenticated(): boolean {
		return localStorage.getItem('token') != null && !this.isTokenExpired();
	}

	// simulate jwt token is valid
	// https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
	isTokenExpired(): boolean {
		//return false;
		const token = localStorage.getItem('token');
		return this.decoder.isTokenExpired(token);
	}

	refreshToken(): Observable<string> {
		const url = 'url to refresh token here';
	
		// append refresh token if you have one
		const refreshToken = localStorage.getItem('refreshToken');
		const expiredToken = localStorage.getItem('token');
	
		return this.http
		  .get(url, {
			headers: new HttpHeaders()
			  .set('refreshToken', refreshToken)
			  .set('token', expiredToken),
			observe: 'response'
		  })
		  .pipe(
			share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
			map(res => {
			  const token = res.headers.get('token');
			  const newRefreshToken = res.headers.get('refreshToken');
	
			  // store the new tokens
			  localStorage.setItem('refreshToken', newRefreshToken);
			  localStorage.setItem('token', token);
	
			  return token;
			})
		  );
	}
	
	getToken(): Observable<string> {
		const token = localStorage.getItem('token');
		const isTokenExpired = this.decoder.isTokenExpired(token);
	
		if (!isTokenExpired) {
		  return of(token);
		}
	
		return this.refreshToken();
	}


	loginAdmin(): void {
		localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);

		this._router.navigate(['/home']);
	}

	login(username, password) {
		
		return this.http.post(`${this.baseUrl}/Account/login`, { username: username, password: password })
	
	
		// localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo`);
	}

	/**
	 * this is used to clear local storage and also the route to login
	 */
	logout(): void {
		this.clear();
		this._router.navigate(['/login']);
	}

	decode() {
		return decode(localStorage.getItem('token'));
	}
}