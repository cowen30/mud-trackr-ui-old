import { ParticipationDay } from "../helpers/participation-day.enum";
import { EventDetail } from "./event-detail.model";
import { User } from "./user.model";

export interface Participant {
	id?: number,
	user: User,
	eventDetail: EventDetail,
	participationDay: ParticipationDay,
	active: boolean,
	additionalLaps: number
}
