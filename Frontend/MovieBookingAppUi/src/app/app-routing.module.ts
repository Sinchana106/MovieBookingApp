import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AddMovieComponent } from './movie/add-movie/add-movie.component';
import { MovieTableComponent } from './movie/movie-table/movie-table.component';
import { UpdateMovieComponent } from './movie/update-movie/update-movie.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AddTheatreComponent } from './theatre/add-theatre/add-theatre.component';
import { TheatreTableComponent } from './theatre/theatre-table/theatre-table.component';
import { AddShowtimeComponent } from './showTime/add-showtime/add-showtime.component';
import { TicketBookingComponent } from './ticket/ticket-booking/ticket-booking.component';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';

const routes: Routes = [
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: "view-movie", component: MovieTableComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: "add-theatre", component: AddTheatreComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: "add-showtime", component: AddShowtimeComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: "view-theatre", component: TheatreTableComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: "view-ticket", component: TicketHistoryComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: "add-movie", component: AddMovieComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: "update-movie/:movieId", component: UpdateMovieComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: "user", component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: "ticket-book/:id", component: TicketBookingComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: "my_ticket", component: MyTicketComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forbidden", component: ForbiddenComponent },
  { path: "**", redirectTo: "/login", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
