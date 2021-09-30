import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { Participant } from 'src/app/models/participant.model';
import { User } from 'src/app/models/user.model';
import { ParticipantService } from 'src/app/services/participants/participant.service';

@Component({
	selector: 'app-profile-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

	private _user = new BehaviorSubject<User>({ id: 0 });

	@Input('user') set user(value: User) {
		this._user.next(value);
	}

	get user() {
		return this._user.getValue();
	}

	participants!: Participant[];
	modalRef?: BsModalRef;

	constructor(
		private participantService: ParticipantService,
		private modalService: BsModalService
	) { }

	ngOnInit(): void {
		this._user.subscribe((user) => {
			if (user != undefined && user.id !== 0) {
				this.participantService.getParticipantsByUserId(user.id).subscribe((participants: Participant[]) => {
					this.participants = participants;
				});
			}
		});
	}

	openParticipantModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

}
