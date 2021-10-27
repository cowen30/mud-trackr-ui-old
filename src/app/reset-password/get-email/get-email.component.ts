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

	formSubmitted: boolean = false;

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
			this.formSubmitted = true;
			this.spinner.hide();
		});
	}

}
