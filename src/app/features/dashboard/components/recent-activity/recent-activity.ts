import { Component, input, computed } from '@angular/core';
import { AccountSummary, TransactionData } from '../../models/dashboard.model';

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
  transactions = input<TransactionData[]>([]);
  accounts = input<AccountSummary[]>([]);

  recentTransactions = computed(() => {
    const accountMap = new Map(
      this.accounts().map(account => [
        account.accountId,
        account.accountName
      ])
    );
    return [...this.transactions()].sort((a,b) => b.transactionDate.localeCompare(a.transactionDate)).slice(0,15)
    .map(transaction => ({
      ...transaction,
      accountName: accountMap.get(transaction.accountId) ?? `Account #$(transaction.accountId)`
    }));
  });

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(`${date}T00:00:00`));
  }
}
