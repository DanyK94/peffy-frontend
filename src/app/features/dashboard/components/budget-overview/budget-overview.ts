import { Component, input } from '@angular/core';
import { BudgetSummary } from '../../models/dashboard.model';

@Component({
  imports: [],
  selector: 'app-budget-overview',
  styleUrl: './budget-overview.css',
  templateUrl: './budget-overview.html',
})
export class BudgetOverview {
  budgets = input<BudgetSummary[]>([]);

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('it-IT',{
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }

  getProgress(spent: number, budget: number): number {
    if (budget <= 0) {
      return 0;
    }

    return Math.min(Math.max((spent/budget)*100,0),100);
  }
}
