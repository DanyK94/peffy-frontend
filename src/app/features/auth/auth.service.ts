import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, filter, finalize, map, Observable, shareReplay, switchMap, take, tap } from "rxjs";
import { API_CONFIG } from "../../app.config";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    user: UserResponse;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    
    private http = inject(HttpClient);
    private accessToken: string | null = null;
    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);
    private refreshInProgress$: Observable<string> | null = null;

    login(credentials: LoginRequest): Observable<LoginResponse> {
        console.log('[AUTH] Avvio recupero CSRF');
        return this.http.get<void>(`${API_CONFIG.baseUrl}/auth/csrf`)
            .pipe
            (
                tap(() => console.log('[AUTH] CSRF Recuperato, Cookie:', document.cookie)),
                switchMap(() => this.http.post<LoginResponse>(`${API_CONFIG.baseUrl}/users/login`, credentials)
            ),
            tap(response => {this.accessToken = response.accessToken;})
        );
    }

    refreshSession(): Observable<LoginResponse> {
        return this.http.get<void> (`${API_CONFIG.baseUrl}/auth/csrf`)
            .pipe( switchMap(() => this.http.post<LoginResponse>(`${API_CONFIG.baseUrl}/auth/refresh`, {})),
        tap(Response => {this.accessToken = Response.accessToken}));
    }

    /*
    refreshAccessToken(): Observable<string> {

        if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1)
            );
        }

        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        return this.refreshSession().pipe(
            tap( response => { this.refreshTokenSubject.next(response.accessToken); }),
            switchMap( response => { return [response.accessToken] }),
            finalize( () => {this.isRefreshing = false;} )
        );
    }
    */

    refreshAccessToken(): Observable<string> {

        if (this.refreshInProgress$) {
            return this.refreshInProgress$;
        }

        this.refreshInProgress$ = this.refreshSession().pipe(
            map(response => response.accessToken),
            finalize(() => {
            this.refreshInProgress$ = null;
            }),
            shareReplay({
            bufferSize: 1,
            refCount: false
            })
        );

        return this.refreshInProgress$;
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    isAuthenticated(): boolean {
        return this.accessToken != null;
    }

    logout(): void {
        this.accessToken = null;
    }
}