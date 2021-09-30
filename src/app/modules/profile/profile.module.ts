import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';
import { DetailsComponent } from './details/details.component';
import { EventsComponent } from './events/events.component';

@NgModule({
	declarations: [
		ProfileComponent,
		DetailsComponent,
		EventsComponent
	],
	imports: [
		ProfileRoutingModule
	],
	providers: [],
	bootstrap: [ProfileComponent]
})
export class ProfileModule { }
