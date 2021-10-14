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

	loggedIn = new BehaviorSubject<boolean>(false);
	redirectUrl: string | null = null;

	baseUrl = environment.serviceUrl;

	constructor(
		private http: HttpClient,
		private tokenStorageService: TokenStorageService
	) {
		this.loggedIn.next(!!this.tokenStorageService.getToken());
	}

	login(loginUser: any): Observable<any> {
		return this.http.post(`${this.baseUrl}/login`, { 'user': loginUser }, httpOptions).pipe(map((result: any) => {
			this.tokenStorageService.saveToken(result['token']);
			this.tokenStorageService.saveUser(result['user']);
			this.loggedIn.next(true);
		}));
	}

	logout(): void {
		this.tokenStorageService.signOut();
		this.loggedIn.next(false);
	}

}
