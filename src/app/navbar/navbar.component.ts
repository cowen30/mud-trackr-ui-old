import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	isLoggedIn: boolean = false;
	currentUser: any;

	sub!: Subscription;

	constructor(
		private authService: AuthService,
		private tokenStorageService: TokenStorageService
	) { }

	ngOnInit(): void {
		this.sub = this.authService.isLoggedIn.subscribe((loggedIn) => {
			this.isLoggedIn = loggedIn;
			this.currentUser = this.tokenStorageService.getUser();
		});
	}

	logout(): void {
		this.authService.logout();
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

}
