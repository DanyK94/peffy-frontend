import { Component, inject, OnInit, signal } from '@angular/core';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { CashFlowChart } from './components/cash-flow-chart/cash-flow-chart';
import { SpendingChart } from './components/spending-chart/spending-chart';
import { RecentActivity } from './components/recent-activity/recent-activity';
import { DashboardService } from './services/dashboard.service';
import { DashboardResponse } from './models/dashboard.model';


@Component({
  imports: [SummaryCards, CashFlowChart, SpendingChart, RecentActivity],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  selectedMonth = new Date();

  private getMonthDateRange(date: Date): {
    startDate: string;
    endDate: string;
  } {
    const year = date.getFullYear();
    const month = date.getMonth();

    const formatDate = (value: Date): string => {
      const year = value.getFullYear();
      const month = String(value.getMonth()+1).padStart(2,'0');
      const day = String(value.getDate()).padStart(2,'0');

      return `${year}-${month}-${day}`;
    }
    return {
      startDate: formatDate(new Date(year,month,1)),
      endDate: formatDate(new Date(year, month + 1, 0))
    };
  }

  
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  dashboardData= signal <DashboardResponse | null> (null);

  readonly userId = 1;

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const {startDate, endDate} = this.getMonthDateRange(this.selectedMonth);

    this.dashboardService.getDashboard(this.userId, startDate, endDate).subscribe({
      next: (data) => {
        this.dashboardData.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Failed to load dashboard: ', error);
        this.errorMessage.set('Unable to load dashboard data.');
        this.isLoading.set(false);
      }
    });
  }

  changeMonth(offset: number) : void {
    this.selectedMonth = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth() + offset,
      1
    )
    this.loadDashboard();
  }

  get selectedMonthLabel(): string {
    return new Intl.DateTimeFormat('en-US', {
      month : 'long',
      year: 'numeric'
    }).format(this.selectedMonth);
  }

}
