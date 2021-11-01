import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';

@Component({
	selector: 'app-profile-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

	@Input('user') user?: User;

	modalRef?: BsModalRef;

	constructor(
		private modalService: BsModalService,
		private userService: UserService
	) { }

	ngOnInit(): void {
	}

	openModal(template: TemplateRef<any>): void {
		this.modalRef = this.modalService.show(template);
	}

	deleteAccount(): void {
		if (this.user) {
			this.userService.deleteUserAccount(this.user.id).subscribe((result) => {
				console.log(result);
			});
		}
	}

}
