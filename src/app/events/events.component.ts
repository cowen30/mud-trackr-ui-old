import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/events/event.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Event } from '../models/event.model';
import { Brand } from '../models/brand.model';
import { BrandService } from '../services/brands/brand.service';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

	stateList: string[] = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
	countryList: string[] = ['USA', 'Australia', 'Canada', 'Germany', 'UK'];

	events!: Event[];
	brands!: Brand[];
	createEventForm = this.formBuilder.group({
		name: '',
		brandId: 1,
		address: '',
		city: '',
		state: '',
		country: '',
		date: ''
	});

	modalRef?: BsModalRef;

	constructor(
		private eventService: EventService,
		private brandService: BrandService,
		private router: Router,
		private formBuilder: FormBuilder,
		private modalService: BsModalService
	) { }

	ngOnInit(): void {
		this.getEventsList();
		this.getBrandsList();
	}

	getEventsList(): void {
		this.eventService.getEvents().subscribe((events) => {
			console.log(events);
			this.events = events;
		});
	}

	getBrandsList(): void {
		this.brandService.getBrands().subscribe((brands) => {
			this.brands = brands;
		});
	}

	linkToEvent(eventId: number): void {
		this.router.navigate(['events', eventId.toString()]);
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

}
