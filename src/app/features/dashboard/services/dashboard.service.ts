import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DashboardResponse } from "../models/dashboard.model";
import { API_CONFIG } from "../../../app.config";

@Injectable({
    providedIn: 'root'
})

export class DashboardService{
    private readonly http = inject(HttpClient);

    getDashboard(userId: number, startDate: string, endDate: string): Observable<DashboardResponse> {

        const params = new HttpParams()
            .set('userId', userId)
            .set('startDate', startDate)
            .set('endDate', endDate);

        return this.http.get<DashboardResponse>(
            `${API_CONFIG.baseUrl}/dashboard_v2`, {params}
        );
    }
}