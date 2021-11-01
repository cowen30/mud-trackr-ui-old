import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/models/event.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EventService {

	baseUrl = environment.serviceUrl;

	constructor(private http: HttpClient) { }

	getEvents(): Observable<Event[]> {
		return this.http.get<Event[]>(`${this.baseUrl}/events`);
	}

	getEventById(id: string): Observable<Event> {
		return this.http.get<Event>(`${this.baseUrl}/events/${id}`).pipe(map((event: Event) => {
			return Event.deserialize(event);
		}));
	}

	createEvent(event: Event): Observable<Event> {
		return this.http.post<Event>(`${this.baseUrl}/events`, { 'event': event })
	}

}
