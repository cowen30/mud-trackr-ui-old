import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class InitService {

	constructor(
		private http: HttpClient
	) { }

	initialize(): Observable<any> {
		return this.http.get<any>(window.location.origin + '/service-url').pipe(
			catchError((_) => {
				environment.serviceUrl = 'http://localhost:3000';
				return of();
			})
		).pipe(
			map((response: any) => {
				environment.serviceUrl = response.url;
			})
		);
	}

}
