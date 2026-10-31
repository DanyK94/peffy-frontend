export interface DashboardResponse {
    balance: number;
    monthIncome: number;
    monthExpenses: number;
    accountSummList: AccountSummary[];
    categorySummList: CategoryTotals[];
    transactionSummList: TransactionData[];
}

export interface AccountSummary {
  accountId: number;
  accountName: string;
  accountType: string;
  currency: string;

  balance: number;
  income: number;
  expenses: number;

  startDateSum: string;
  endDateSum: string;
}

export interface CategoryTotals {
  categoryId: number;
  categoryName: string;
  total: number;
}

export interface TransactionData {
  id: number;
  amount: number;
  categoryId: number;
  categoryName: string;
  accountId: number;
  transDescription: string;
  transactionDate: string;
  notes: string | null;
}