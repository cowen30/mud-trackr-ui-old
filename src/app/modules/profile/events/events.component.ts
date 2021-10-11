import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { EventType } from 'src/app/models/event-type.model';
import { Event } from 'src/app/models/event.model';
import { Participant } from 'src/app/models/participant.model';
import { User } from 'src/app/models/user.model';
import { EventTypeService } from 'src/app/services/event-types/event-type.service';
import { EventService } from 'src/app/services/events/event.service';
import { ParticipantService } from 'src/app/services/participants/participant.service';

@Component({
	selector: 'app-profile-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

	private _user = new BehaviorSubject<User>({ id: 0 });
	private _loadFinished = new BehaviorSubject<boolean>(false);
	loadFinished = this._loadFinished.asObservable();

	@Input('user') set user(value: User) {
		this._user.next(value);
	}

	get user() {
		return this._user.getValue();
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

	eventsList!: Event[];
	eventTypesList!: EventType[];

	participants!: Participant[];
	modalRef?: BsModalRef;

	constructor(
		private participantService: ParticipantService,
		private eventService: EventService,
		private eventTypeService: EventTypeService,
		private modalService: BsModalService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this._user.subscribe((user) => {
			if (user != undefined && user.id !== 0) {
				this.participantForm.controls['userId'].setValue(user.id);
				this.participantService.getParticipantsByUserId(user.id).subscribe((participants: Participant[]) => {
					this.participants = participants;
					this._loadFinished.next(true);
					this._loadFinished.complete();
				});
			}
		});
		this.eventService.getEvents().subscribe((events: Event[]) => {
			this.eventsList = events;
		})
		this.eventTypeService.getEventTypes().subscribe((eventTypes: EventType[]) => {
			this.eventTypesList =  eventTypes;
		})
	}

	clearParticipantForm() {
		this.participantForm.reset({ userId: this.user.id });
	}

	newParticipant(template: TemplateRef<any>) {
		this.clearParticipantForm();
		this.openParticipantModal(template);
	}

	openParticipantModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}

	submitParticipantForm(): void {
		if (this.participantForm.controls['id'].value == null) {
			this.participantService.addParticipant(this.participantForm.value).subscribe((participant: Participant) => {
				this.participants.push(participant);
				this.modalRef?.hide();
			});
		} else {
			this.participantService.editParticipant(this.participantForm.value).subscribe((updatedParticipant: Participant) => {
				const index = this.participants.findIndex((participant) => participant.id == updatedParticipant.id);
				this.participants[index] = updatedParticipant;
				this.modalRef?.hide();
			});
		}
	}

	editParticipant(participant: Participant, template: TemplateRef<any>): void {
		this.participantForm.patchValue({
			id: participant.id,
			eventDetailAttributes: {
				eventId: participant.eventDetail.event.id,
				eventTypeId: participant.eventDetail.eventType.id
			},
			participationDay: participant.participationDay,
			additionalLaps: participant.additionalLaps
		});
		this.openParticipantModal(template);
	}

	deleteParticipant(): void {
		this.participantService.deleteParticipant(this.participantForm.controls['id'].value).subscribe(() => {
			this.participants.splice(this.participants.indexOf(this.participantForm.value), 1);
			this.modalRef?.hide();
		})
	}

	subtractLap(): void {
		if (this.participantForm.controls['additionalLaps'].value != null && this.participantForm.controls['additionalLaps'].value >= 1) {
			this.participantForm.controls['additionalLaps'].setValue(this.participantForm.controls['additionalLaps'].value - 1);
		}
	}

	addLap(): void {
		this.participantForm.controls['additionalLaps'].setValue(this.participantForm.controls['additionalLaps'].value + 1);
	}

}
