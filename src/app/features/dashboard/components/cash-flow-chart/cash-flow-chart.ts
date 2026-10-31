import { Component, input, computed } from '@angular/core';
import { Chart , ChartConfiguration , ChartData , registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TransactionData } from '../../models/dashboard.model';

Chart.register(...registerables);

@Component({
  imports: [BaseChartDirective],
  selector: 'app-cash-flow-chart',
  styleUrl: './cash-flow-chart.css',
  templateUrl: './cash-flow-chart.html',
})
export class CashFlowChart {
  transactions = input<TransactionData[]>([]);

  cashFlowData = computed<ChartData<'bar'>>(() =>{
    const weeks = [
      { label: 'Week 1', start: 1, end: 7 },
      { label: 'Week 2', start: 8, end: 14 },
      { label: 'Week 3', start: 15, end: 21 },
      { label: 'Week 4', start: 22, end: 31 }
    ];
    const transactions = this.transactions();
    const income = weeks.map( week => transactions
      .filter(t => {
      const day = Number(t.transactionDate.slice(8,10));
      return day >= week.start && day <= week.end && t.amount > 0;
      }).reduce((sum,t) => sum + t.amount,0)

    );

    const expenses = weeks.map(week =>
      transactions.filter( t => {
        const day = Number(t.transactionDate.slice(8,10));
        return day >= week.start && day <= week.end && t.amount < 0;
      }).reduce((sum, t) => sum + Math.abs(t.amount),0)
    );

    return {
      labels: weeks.map(week => week.label),
      datasets: [
        {
          label: 'Income',
          data: income,
          backgroundColor: '#10B981',
          borderRadius: 6
        },
        {
          label: 'Expenses',
          data: expenses,
          backgroundColor: '#F87171',
          borderRadius: 6
        }
      ]
    };
  });

    cashFlowOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94A3B8',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      },
      tooltip: {
        callbacks: {
          label: context => {
            const value = Number(context.raw ?? 0);
            const formatted = new Intl.NumberFormat('it-IT', {
              style: 'currency',
              currency: 'EUR'
            }).format(value);

            return `${context.dataset.label}: ${formatted}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#94A3B8' },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94A3B8',
          callback: value =>
            new Intl.NumberFormat('it-IT', {
              notation: 'compact',
              maximumFractionDigits: 1
            }).format(Number(value))
        },
        grid: { color: 'rgba(148, 163, 184, 0.1)' }
      }
    }
  };
}