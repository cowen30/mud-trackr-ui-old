import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
	selector: 'app-verify-account',
	templateUrl: './verify-account.component.html',
	styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {

	private queryParamSub!: Subscription;

	verificationSuccess: boolean = false;
	verificationFailed: boolean = false;
	errorMessage: string = '';

	constructor(
		private route: ActivatedRoute,
		private authService: AuthService,
		private router: Router,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit(): void {
		this.spinner.show();
		this.queryParamSub = this.route.queryParams.subscribe(params => {
			this.authService.verifyAccount(params['userId'], params['verificationCode']).subscribe(() => {
				this.verificationSuccess = true;
			}, (error) => {
				this.verificationFailed = true;
				this.errorMessage = error.error.message;
			}).add(() => {
				this.spinner.hide();
			});
		});
	}

	ngOnDestroy() {
		this.queryParamSub.unsubscribe();
	}

}
