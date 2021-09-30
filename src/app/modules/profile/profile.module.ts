import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';
import { DetailsComponent } from './details/details.component';
import { EventsComponent } from './events/events.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		ProfileComponent,
		DetailsComponent,
		EventsComponent
	],
	imports: [
		CommonModule,
		ProfileRoutingModule
	],
	providers: [],
	bootstrap: [ProfileComponent]
})
export class ProfileModule { }
