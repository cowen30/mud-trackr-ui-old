import { EventType } from "./event-type.model";
import { Event } from "./event.model";
import { User } from "./user.model";

export interface EventDetail {
	id: number,
	event: Event,
	eventType: EventType,
	lapDistance: number,
	lapElevation: number,
	updatedBy: User,
	createdAt: Date,
	updatedAt: Date
}
