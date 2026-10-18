import { formatCurrency } from '@angular/common';
import { Component, input } from '@angular/core';

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

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('it-IT',{
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }
}
