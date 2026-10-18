import { Component, inject, OnInit } from '@angular/core';
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

  dashboardData: DashboardResponse | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  readonly userId = 1;

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.dashboardService.getDashboard(this.userId).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to load dashboard: ', error);
        this.errorMessage = 'Unable to load dashboard data.'
        this.isLoading = false;
      }
    });
  }

  // TEST DATA  ***//
  totalBalance = 5400;
  monthlyIncome = 2500;
  monthlyExpenses = 360;

  recentTransactions = [
    {
      description: 'Groceries',
      category: 'Food',
      account: 'Revolut',
      date: 'Oct 04, 2026',
      amount: -120
    },
    {
      description: 'Salary',
      category: 'Income',
      account: 'Intesa',
      date: 'Oct 01, 2026',
      amount: 2500
    },
    {
      description: 'Restaurant',
      category: 'Food',
      account: 'Intesa',
      date: 'Oct 03, 2026',
      amount: -50
    },
    {
      description: 'Fuel',
      category: 'Transport',
      account: 'Revolut',
      date: 'Oct 05, 2026',
      amount: -60
    }
  ];

  accounts = [
    {
      name: 'Intesa',
      type: 'Bank account',
      balance: 4370,
      icon: 'I'
    },
    {
      name: 'Revolut',
      type: 'Bank account',
      balance: 780,
      icon: 'R'
    },
    {
      name: 'Cash',
      type: 'Cash account',
      balance: 250,
      icon: 'C'
    }
  ];
  // ********************** //
}
