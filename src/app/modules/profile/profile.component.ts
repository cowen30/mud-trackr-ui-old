import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { ParticipantService } from 'src/app/services/participants/participant.service';
import { UserService } from 'src/app/services/users/user.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { EventsComponent } from './events/events.component';
import { InfoSummaryBarComponent } from './info-summary-bar/info-summary-bar.component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	@ViewChild('eventsComponent')
	eventsComponent!: EventsComponent;

	@ViewChild('infoSummaryBarComponent')
	infoSummaryBarComponent!: InfoSummaryBarComponent;

	private queryParamSub!: Subscription;

	userResult!: Observable<void>;
	statsResult!: Observable<void>;

	activeTab: string | null = 'details';
	user!: User;

	tmLegionnaireCount: number = 0;

	constructor(
		private tokenStorageService: TokenStorageService,
		private userService: UserService,
		private spinner: NgxSpinnerService,
		private participantService: ParticipantService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.spinner.show();
		this.queryParamSub = this.route.queryParams.subscribe(params => {
			const activeTab = params['activeTab'];
			if (activeTab != null) {
				this.activeTab = activeTab;
			}
		});
		const userId = this.tokenStorageService.getUser().id;
		this.userResult = this.userService.getUserById(userId).pipe(map((user: User) => {
			this.user = user;
		}));
		this.statsResult = this.participantService.getTmLegionnaireCountForUser(userId).pipe(map((count: number) => {
			this.tmLegionnaireCount = count;
		}));
		
	}

	ngAfterViewInit(): void {
		let eventsLoadFinished = this.eventsComponent.loadFinished;
		forkJoin([this.userResult, this.statsResult, eventsLoadFinished]).subscribe(_ => {
			this.spinner.hide();
		});
	}

	ngOnDestroy() {
		this.queryParamSub.unsubscribe();
	}

}
