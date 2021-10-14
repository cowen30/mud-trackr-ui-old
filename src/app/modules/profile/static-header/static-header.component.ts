import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
	selector: 'app-profile-static-header',
	templateUrl: './static-header.component.html',
	styleUrls: ['./static-header.component.scss']
})
export class StaticHeaderComponent implements OnInit {

	private _user = new BehaviorSubject<User>({ id: 0 });
	private _loadFinished = new BehaviorSubject<boolean>(false);
	loadFinished = this._loadFinished.asObservable();

	@Input('user') set user(value: User) {
		this._user.next(value);
	}

	get user() {
		return this._user.getValue();
	}

	@Input('legionnaireCount') legionnaireCount: number = 0;

	constructor() { }

	ngOnInit(): void {
	}

}
