import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

	modalRef?: BsModalRef;

	constructor(
		private authService: AuthService,
		private tokenStorageService: TokenStorageService,
		private modalService: BsModalService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.sub = this.authService.loggedIn.subscribe((loggedIn) => {
			this.isLoggedIn = loggedIn;
			this.currentUser = this.tokenStorageService.getUser();
		});
	}

	logoutConfirmation(template: TemplateRef<any>): void {
		this.modalRef = this.modalService.show(template);
	}

	logout(): void {
		this.authService.logout();
		this.modalRef?.hide();
		this.router.navigate(['']);
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

}
