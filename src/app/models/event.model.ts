import { Brand } from "./brand.model";

export interface Event {
	id: number,
	name?: string,
	brand?: Brand,
	address?: string,
	city?: string,
	state?: string,
	country?: string,
	date?: Date,
	latitude?: string,
	longitude?: string,
	archived?: boolean,
	// createdBy: User,
	// updatedBy: User,
	createdAt?: Date,
	updatedAt?: Date
}
