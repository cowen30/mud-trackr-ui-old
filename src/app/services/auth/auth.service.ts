import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../token-storage/token-storage.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _loggedInSource = new BehaviorSubject<boolean>(false);
	isLoggedIn = this._loggedInSource.asObservable();

	baseUrl = environment.serviceUrl;

	constructor(
		private http: HttpClient,
		private tokenStorageService: TokenStorageService,
		private router: Router
	) {
		this._loggedInSource.next(!!this.tokenStorageService.getToken());
	}

	login(loginUser: any): void {
		this.http.post(`${this.baseUrl}/login`, { 'user': loginUser }, httpOptions).subscribe((result: any) => {
			this.tokenStorageService.saveToken(result['token']);
			this.tokenStorageService.saveUser(result['user']);
			this._loggedInSource.next(true);
			this.router.navigate(['']);
		});
	}

	logout() {
		this._loggedInSource.next(false);
		this.tokenStorageService.signOut();
	}

}
