import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	baseUrl = environment.serviceUrl;

	constructor(private http: HttpClient) { }

	getUserById(id: string): Observable<User> {
		return this.http.get<User>(`${this.baseUrl}/users/${id}`)
	}

}
