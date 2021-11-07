import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './events/event/event.component';
import { EventDetailsComponent } from './events/event/details/details.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { MainComponent } from './main/main.component';
import { SharedModule } from './modules/shared/shared.module';
import { ParticipantsComponent } from './events/event/participants/participants.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GetEmailComponent } from './reset-password/get-email/get-email.component';
import { ChangePasswordComponent } from './reset-password/change-password/change-password.component';
import { ChangeConfirmationComponent } from './reset-password/change-confirmation/change-confirmation.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function initializeAppFactory(httpClient: HttpClient): () => Observable<any> {
  return () => httpClient.get<any>(window.location.origin + '/service-url').pipe(map((response: any) => {
    console.log(response.url);
    sessionStorage.setItem('serviceUrl', response.url);
  }));
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    EventsComponent,
    EventComponent,
    EventDetailsComponent,
    LoginComponent,
    MainComponent,
    ParticipantsComponent,
    CreateAccountComponent,
    VerifyAccountComponent,
    ResetPasswordComponent,
    GetEmailComponent,
    ChangePasswordComponent,
    ChangeConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxBootstrapIconsModule.pick(allIcons),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [HttpClient],
      multi: true
    },
    authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
