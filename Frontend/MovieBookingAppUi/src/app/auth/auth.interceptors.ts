import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../services/user-auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userAuth:UserAuthService,private router:Router){}
    /*
    * intercept(  req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>>)=> Intercept each request and performs either of the two cases below
    *   1. If the request has Headers='No-Auth', then it will simply clone the request 
    *   2. Otherwise, it will append each request with JWT Token
    */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
          return next.handle(req.clone());
        }
    
        const token = this.userAuth.getToken();
    
        req = this.addToken(req, token);
    
        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse) => {
                    console.log(err.status);
                    if(err.status === 401) {
                        this.router.navigate(['/login']);
                    } else if(err.status === 403) {
                        this.router.navigate(['/forbidden']);
                    }
                    return throwError("Some thing is wrong");
                }
            )
        );
      }
    
    /*
    * addToken(request:HttpRequest<any>, token:string)=> will add the following header 
    */
      private addToken(request:HttpRequest<any>, token:string) {
          return request.clone(
              {
                  setHeaders: {
                      Authorization : `Bearer ${token}`
                  }
              }
          );
      }
    }