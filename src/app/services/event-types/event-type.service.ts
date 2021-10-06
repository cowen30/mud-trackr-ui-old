import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventType } from 'src/app/models/event-type.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EventTypeService {

	baseUrl = environment.serviceUrl;

	constructor(private http: HttpClient) { }

	getEventTypes(): Observable<EventType[]> {
		return this.http.get<EventType[]>(`${this.baseUrl}/event-types`);
	}

}
