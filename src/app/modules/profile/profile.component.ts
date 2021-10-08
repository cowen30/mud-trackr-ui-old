import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
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

	userResult!: Observable<void>;

	activeTab: string | null = 'details';
	user!: User;

	constructor(
		private tokenStorageService: TokenStorageService,
		private userService: UserService,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit(): void {
		this.spinner.show();
		const userId = this.tokenStorageService.getUser().id;
		this.userResult = this.userService.getUserById(userId).pipe(map((user: User) => {
			this.user = user;
		}));
		
	}

	ngAfterViewInit(): void {
		let eventsLoadFinished = this.eventsComponent.loadFinished;
		let infoSummaryBarLoadFinished = this.infoSummaryBarComponent.loadFinished;
		forkJoin([this.userResult, eventsLoadFinished, infoSummaryBarLoadFinished]).subscribe(_ => {
			this.spinner.hide();
		});
	}

}
