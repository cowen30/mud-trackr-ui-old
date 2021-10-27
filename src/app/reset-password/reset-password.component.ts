import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

	private currentStepBs: BehaviorSubject<number> = new BehaviorSubject<number>(1);
	public currentStep: Observable<number> = this.currentStepBs.asObservable();

	private queryParamSub!: Subscription;

	userId: string = '';
	resetCode: string = '';

	constructor(
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.queryParamSub = this.route.queryParams.subscribe(params => {
			const userId = params['userId'];
			const resetCode = params['resetCode'];
			if (userId != null && resetCode != null) {
				this.userId = userId;
				this.resetCode = resetCode;
				this.currentStepBs.next(2);
			}
		});
	}

	passwordChanged() {
		this.currentStepBs.next(3);
	}

	ngOnDestroy() {
		this.queryParamSub.unsubscribe();
	}

}
