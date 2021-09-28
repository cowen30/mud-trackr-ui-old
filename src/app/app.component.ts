import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'mud-trackr-ui';

	@ViewChild(LoginComponent) loginComponent!: LoginComponent;

	isLoggedIn: boolean = false;
}
