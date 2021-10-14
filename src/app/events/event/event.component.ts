import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/models/event.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventService } from 'src/app/services/events/event.service';
import { ParticipantsComponent } from './participants/participants.component';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

	availableTabs: string[] = ['details', 'participants'];
	isLoggedIn: boolean = false;
	sub!: Subscription;

	private routeParamSub!: Subscription;
	private queryParamSub!: Subscription;

	@ViewChild('participantsComponent')
	participantsComponent!: ParticipantsComponent;

	eventResult!: Observable<void>;

	event!: Event;
	activeTab: string | null = 'details';
	
	constructor(
		private route: ActivatedRoute,
		private eventService: EventService,
		private spinner: NgxSpinnerService,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.spinner.show();
		this.routeParamSub = this.route.params.subscribe(params => {
			this.eventResult = this.eventService.getEventById(params['id']).pipe(map((event) => {
				this.event = event;
			}));
		});
		this.queryParamSub = this.route.queryParams.subscribe(params => {
			const potentialActiveTab = params['activeTab'];
			if (this.availableTabs.includes(potentialActiveTab)) {
				this.activeTab = potentialActiveTab;
			}
		});
		this.sub = this.authService.loggedIn.subscribe((loggedIn) => {
			this.isLoggedIn = loggedIn;
		});
	}

	ngAfterViewInit(): void {
		let loadingDependencies: Observable<any>[] = [this.eventResult];
		if (this.authService.loggedIn.getValue()) {
			loadingDependencies.push(this.participantsComponent.loadFinished);
		}
		forkJoin(loadingDependencies).subscribe(_ => {
			this.spinner.hide();
		});
	}

	ngOnDestroy() {
		this.routeParamSub.unsubscribe();
		this.queryParamSub.unsubscribe();
		this.sub.unsubscribe();
	}

}
