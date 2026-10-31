import { formatCurrency } from '@angular/common';
import { Component, input } from '@angular/core';
import { AccountSummary } from '../../models/dashboard.model';

@Component({
  imports: [],
  selector: 'app-summary-cards',
  styleUrl: './summary-cards.css',
  templateUrl: './summary-cards.html',
})
export class SummaryCards {
  totalBalance = input<number>(0);
  monthlyIncome = input<number>(0);
  monthlyExpenses = input<number>(0);

  accounts = input<AccountSummary[]>([]);

  formatCurrency(value: number, currency = 'EUR'): string {
    return new Intl.NumberFormat('it-IT',{
      style: 'currency',
      currency
    }).format(value);
  }
}
