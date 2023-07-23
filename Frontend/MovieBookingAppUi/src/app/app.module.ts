import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{    ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptors';
import { UserServiceService } from './services/user-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MovieTableComponent } from './movie/movie-table/movie-table.component';
import { UpdateMovieComponent } from './movie/update-movie/update-movie.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { TheatreTableComponent } from './theatre/theatre-table/theatre-table.component';
import { AddTheatreComponent } from './theatre/add-theatre/add-theatre.component';
import { AddShowtimeComponent } from './showTime/add-showtime/add-showtime.component';
import { TicketBookingComponent } from './ticket/ticket-booking/ticket-booking.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { ModalSuccessComponent } from './modal-success/modal-success.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMovieComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    ForgotPasswordComponent,
    MovieTableComponent,
    UpdateMovieComponent,
    TheatreTableComponent,
    AddTheatreComponent,
    AddShowtimeComponent,
    TicketBookingComponent,
    MyTicketComponent,
    TicketHistoryComponent,
    ModalComponentComponent,
    ModalSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
    ,UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
