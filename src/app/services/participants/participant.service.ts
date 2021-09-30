import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participant } from 'src/app/models/participant.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ParticipantService {

	baseUrl = environment.serviceUrl;

	constructor(private http: HttpClient) { }

	getParticipantsByUserId(userId: number): Observable<Participant[]> {
		return this.http.get<Participant[]>(`${this.baseUrl}/participants/users/${userId.toString()}`);
	}

}
