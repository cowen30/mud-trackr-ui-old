import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	baseUrl = environment.serviceUrl;

	constructor(private http: HttpClient) { }

	getUserById(id: number): Observable<User> {
		return this.http.get<User>(`${this.baseUrl}/users/${id.toString()}`).pipe(map((user: User) => {
			return User.deserialize(user);
		}));
	}

	getUserByIdAndResetCode(id: string, resetCode: string): Observable<User> {
		return this.http.get<User>(`${this.baseUrl}/users/${id}/reset?resetCode=${resetCode}`);
	}

	deleteUserAccount(id: number): Observable<any> {
		return this.http.delete<any>(`${this.baseUrl}/users/${id.toString()}`);
	}

}
