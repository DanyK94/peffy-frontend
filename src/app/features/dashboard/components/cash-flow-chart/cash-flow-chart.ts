import { Component } from '@angular/core';
import { Chart , ChartConfiguration , ChartData , registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  imports: [BaseChartDirective],
  selector: 'app-cash-flow-chart',
  styleUrl: './cash-flow-chart.css',
  templateUrl: './cash-flow-chart.html',
})
export class CashFlowChart {

  cashFlowData: ChartData<'line'> = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Income',
          data: [2500, 0, 0, 0],
          borderColor: '#34D399',
          backgroundColor: 'rgba(52, 211, 153, 0.12)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Expenses',
          data: [130, 95, 75, 60],
          borderColor: '#F87171',
          backgroundColor: 'rgba(248, 113, 113, 0.08)',
          fill: true,
          tension: 0.4
        }
      ]
    };

    cashFlowOptions: ChartConfiguration<'line'>['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#94A3B8',
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {label: (context) =>
            `${context.dataset.label}: ${new Intl.NumberFormat('it-IT', {
              style: 'currency',
              currency: 'EUR'
            }).format(context.parsed.y ?? 0)}`
          }
        }
      },
      scales: {
      x: {
        ticks: { color: '#94A3B8' },
        grid: { color: 'rgba(148, 163, 184, 0.08)' },
        border: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#94A3B8' },
        grid: { color: 'rgba(148, 163, 184, 0.12)' },
        border: { display: false }
      }  
    }
  };
}
