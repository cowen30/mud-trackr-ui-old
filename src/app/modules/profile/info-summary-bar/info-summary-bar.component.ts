import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ParticipantService } from 'src/app/services/participants/participant.service';

@Component({
	selector: 'app-profile-info-summary-bar',
	templateUrl: './info-summary-bar.component.html',
	styleUrls: ['./info-summary-bar.component.scss']
})
export class InfoSummaryBarComponent implements OnInit {

	private _user = new BehaviorSubject<User>({ id: 0 });
	private _loadFinished = new BehaviorSubject<boolean>(false);
	loadFinished = this._loadFinished.asObservable();

	@Input('user') set user(value: User) {
		this._user.next(value);
	}

	get user() {
		return this._user.getValue();
	}

	tmLegionnaireCount: number = 0;

	constructor(
		private participantService: ParticipantService
	) { }

	ngOnInit(): void {
		this._user.subscribe((user) => {
			if (user != undefined && user.id !== 0) {
				this.participantService.getTmLegionnaireCountForUser(user.id).subscribe((count: number) => {
					this.tmLegionnaireCount = count;
					this._loadFinished.next(true);
					this._loadFinished.complete();
				});
			}
		});
	}

}
