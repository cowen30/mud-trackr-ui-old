import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/events/event.service';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

	private sub!: Subscription;

	event!: Event;
	activeTab: string | null = 'details';
	
	constructor(private route: ActivatedRoute, private eventService: EventService) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.eventService.getEventById(params['id']).subscribe((event) => {
				this.event = event;
			});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
