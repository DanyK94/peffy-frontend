import {HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../../features/auth/auth.service";
import { Router } from "@angular/router";
import { catchError, switchMap, throwError } from "rxjs";


const API_URL = 'http://localhost:8080/api';

export const authInterceptor: HttpInterceptorFn = ( req, next) => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const isApiRequest = req.url.startsWith(API_URL);

    if (!isApiRequest){
        return next(req);
    }
    const isAuthEndpoint =
        req.url.includes('/users/login') ||
        req.url.includes('/auth/csrf') ||
        req.url.includes('/auth/refresh');

    const accessToken = authService.getAccessToken();

    const authenticatedRequest = accessToken ? req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
    }) : req;

    return next(authenticatedRequest).pipe(
        catchError((error : HttpErrorResponse) => {
            if ( error.status !== 401 || !accessToken || isAuthEndpoint ) {
                return throwError(() => error );
            }

            return authService.refreshAccessToken().pipe(
                switchMap(newAccessToken => {
                    const retryRequest = req.clone({
                        setHeaders: { Authorization: `Bearer ${newAccessToken}` }
                    });

                    return next(retryRequest);
                }),
                catchError(refreshError => {
                    authService.logout();
                    router.navigate(['/login']);

                    return throwError(() => refreshError);
                })
            );
        })
    );
};