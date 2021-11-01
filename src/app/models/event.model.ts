import { DateTime } from "luxon";
import { Brand } from "./brand.model";
import { User } from "./user.model";

export class Event {
	id: number = 0;
	name?: string;
	brand?: Brand;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	date?: Date;
	latitude?: string;
	longitude?: string;
	archived?: boolean;
	// createdBy: User;
	updatedBy?: User;
	createdAt?: Date;
	updatedAt?: DateTime;

	static deserialize(event: Event): Event {
        event.updatedAt = event.updatedAt ? DateTime.fromISO(event.updatedAt.toString()) : DateTime.now();

        return event;
    }
}
