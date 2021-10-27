import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationsHelper } from 'src/app/helpers/validations.helper';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
	selector: 'app-reset-password-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	
	@Input('userId') userId: string = '';
	@Input('resetCode') resetCode: string = '';

	@Output() passwordChanged = new EventEmitter<boolean>();

	changePasswordForm: FormGroup = this.formBuilder.group({
		id: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [
			Validators.required,
			Validators.minLength(8),
			ValidationsHelper.validatePasswordUppercaseCharacters(),
			ValidationsHelper.validatePasswordSpecialCharacters()
		]],
		passwordConfirmation: ['', Validators.required],
		resetCode: ['', Validators.required]
	}, { validators: ValidationsHelper.validatePasswordMatchesConfirmation });

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		if (this.userId != null && this.resetCode != null) {
			this.changePasswordForm.patchValue({ id: this.userId, resetCode: this.resetCode });
			this.userService.getUserByIdAndResetCode(this.userId, this.resetCode).subscribe((result: User) => {
				this.changePasswordForm.controls['email'].setValue(result.email);
			});
		}
	}

	changePassword() {
		this.authService.setNewPassword(this.changePasswordForm.value).subscribe((result: any) => {
			this.passwordChanged.emit(true);
		});
	}

}
