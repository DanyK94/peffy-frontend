import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, switchMap, tap } from "rxjs";
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