import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Event } from 'src/app/models/event.model';
import { Participant } from 'src/app/models/participant.model';
import { ParticipantService } from 'src/app/services/participants/participant.service';

@Component({
	selector: 'app-event-participants',
	templateUrl: './participants.component.html',
	styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

	private _event = new BehaviorSubject<Event>({ id: 0 });
	private _loadFinished = new BehaviorSubject<boolean>(false);
	loadFinished = this._loadFinished.asObservable();
	
	@Input('event') set event(value: Event) {
		this._event.next(value);
	}

	get event() {
		return this._event.getValue();
	}

	participantForm = this.formBuilder.group({
		id: null,
		userId: null,
		eventDetailAttributes: this.formBuilder.group({
			eventId: null,
			eventTypeId: null
		}),
		participationDay: '',
		additionalLaps: null
	});

	participants!: Participant[];

	constructor(
		private participantService: ParticipantService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this._event.subscribe((event) => {
			if (event != undefined && event.id !== 0) {
				this.participantForm.get('eventDetailAttributes.eventId')?.setValue(event.id);
				this.participantService.getParticipantsByEventId(event.id).subscribe((participants: Participant[]) => {
					this.participants = participants;
					this._loadFinished.next(true);
					this._loadFinished.complete();
				});
			}
		});
	}

}
