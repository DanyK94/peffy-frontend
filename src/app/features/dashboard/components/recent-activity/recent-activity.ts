import { Component, input } from '@angular/core';

export interface RecentTransaction {
  description: string;
  category: string;
  account: string;
  date: string;
  amount: number;
}

@Component({
  imports: [],
  selector: 'app-recent-activity',
  styleUrl: './recent-activity.css',
  templateUrl: './recent-activity.html',
})
export class RecentActivity {
  transaction = input<RecentTransaction[]>([]);

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }

  trackTransaction(
    _index: number,
    transaction: RecentTransaction) : string {
      return '${transaction.description} - ${transaction.date}';
    }
}
