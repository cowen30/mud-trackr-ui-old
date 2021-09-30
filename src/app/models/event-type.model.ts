import { Brand } from "./brand.model";
import { User } from "./user.model";

export interface EventType {
	id: number,
	name: string,
	shortName: string,
	brand: Brand,
	displayOrder: number,
	updatedBy: User,
	createdAt: Date,
	updatedAt: Date
}
