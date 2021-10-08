import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
	selector: 'app-profile-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

	@Input('user') user?: User;

	constructor() { }

	ngOnInit(): void {
	}

}
