export interface DashboardResponse {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    budgets: BudgetSummary[];
}

export interface BudgetSummary{
  categoryId: number;
  categoryName: string;
  budget: number;
  spent: number;
  remaining: number;
}