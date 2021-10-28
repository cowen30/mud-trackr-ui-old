import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-reset-password-get-email',
	templateUrl: './get-email.component.html',
	styleUrls: ['./get-email.component.scss']
})
export class GetEmailComponent implements OnInit {

	resetSuccess!: boolean;
	errorMessage: string = '';

	resetPasswordForm: FormGroup = this.formBuilder.group({
		email: ['', Validators.required]
	});

	get email() {
		return this.resetPasswordForm.get('email')?.value;
	}

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit(): void {
	}

	resetPassword(): void {
		this.spinner.show();
		this.authService.sendPasswordResetEmail(this.resetPasswordForm.get('email')?.value).subscribe(() => {
			this.resetSuccess = true;
		}, (error) => {
			this.resetSuccess = false;
			if (error.status < 500) {
				this.errorMessage = error.error.message;
			} else {
				this.errorMessage = 'An unexpected error has occurred. Please try again or contact us at <a href="mailto:websupport@mudtrackr.com">websupport@mudtrackr.com</a>.';
			}
		}).add(() => {
			this.spinner.hide();
		});
	}

}
