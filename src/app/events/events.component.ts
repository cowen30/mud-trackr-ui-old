import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/events/event.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Event } from '../models/event.model';
import { Brand } from '../models/brand.model';
import { BrandService } from '../services/brands/brand.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { AuthService } from '../services/auth/auth.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

	stateList: string[] = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
	countryList: string[] = ['USA', 'Australia', 'Canada', 'Germany', 'UK'];

	isLoggedIn: boolean = false;
	sub!: Subscription;

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
		private modalService: BsModalService,
		private tokenStorageService: TokenStorageService,
		private authService: AuthService,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit(): void {
		this.sub = this.authService.loggedIn.subscribe((loggedIn) => {
			this.isLoggedIn = loggedIn;
		});
		this.isLoggedIn = !!this.tokenStorageService.getToken();
		this.spinner.show();
		let eventsList = this.getEventsList();
		let brandsList = this.getBrandsList();
		forkJoin([eventsList, brandsList]).subscribe(_ => {
			this.spinner.hide();
		});
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	getEventsList(): Observable<void> {
		return this.eventService.getEvents().pipe(map((events: Event[]) => {
			this.events = events;
		}));
	}

	getBrandsList(): Observable<void> {
		return this.brandService.getBrands().pipe(map((brands: Brand[]) => {
			this.brands = brands;
		}));
	}

	linkToEvent(eventId: number): void {
		this.router.navigate(['events', eventId.toString()]);
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	submitEventForm(): void {
		this.eventService.createEvent(this.createEventForm.value).subscribe((createdEvent: Event) => {
			this.modalRef?.hide();
			this.linkToEvent(createdEvent.id);
		});
	}

}
