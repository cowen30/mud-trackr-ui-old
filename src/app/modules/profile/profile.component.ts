import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/user.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { InfoSummaryBarComponent } from './info-summary-bar/info-summary-bar.component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	@ViewChild('infoSummaryBarComponent')
	infoSummaryBarComponent!: InfoSummaryBarComponent;
	activeTab: string | null = 'details';
	user!: User;

	constructor(
		private tokenStorageService: TokenStorageService,
		private userService: UserService
	) { }

	ngOnInit(): void {
		const userId = this.tokenStorageService.getUser().id;
		this.userService.getUserById(userId).subscribe((user: User) => {
			this.user = user;
		});
	}

}
