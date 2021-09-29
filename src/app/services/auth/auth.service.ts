import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
		private tokenStorageService: TokenStorageService
	) {
		this._loggedInSource.next(!!this.tokenStorageService.getToken());
	}

	login(loginUser: any): Observable<any> {
		return this.http.post(`${this.baseUrl}/login`, { 'user': loginUser }, httpOptions).pipe(map((result: any) => {
			this.tokenStorageService.saveToken(result['token']);
			this.tokenStorageService.saveUser(result['user']);
			this._loggedInSource.next(true);
		}));
	}

	logout() {
		this._loggedInSource.next(false);
		this.tokenStorageService.signOut();
	}

}
