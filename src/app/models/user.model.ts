import { DateTime } from "luxon";

export class User {
	id: number = 0;
	firstName?: string;
	lastName?: string;
	email?: string;
	active?: boolean;
	createdAt?: DateTime;
	updatedAt?: DateTime;

	static deserialize(user: User): User {
        user.createdAt = user.createdAt ? DateTime.fromISO(user.createdAt.toString()) : DateTime.now();
        user.updatedAt = user.updatedAt ? DateTime.fromISO(user.updatedAt.toString()) : DateTime.now();

        return user;
    }
}
