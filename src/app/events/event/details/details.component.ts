import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';

@Component({
	selector: 'app-event-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class EventDetailsComponent implements OnInit {

	@Input('event') event!: Event;

	constructor() { }

	ngOnInit(): void {
	}

}
