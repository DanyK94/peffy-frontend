import { Component } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  imports: [BaseChartDirective],
  selector: 'app-spending-chart',
  styleUrl: './spending-chart.css',
  templateUrl: './spending-chart.html',
})
export class SpendingChart {
  spendingData: ChartData<'doughnut'> = {
    labels: ['Food', 'Transport', 'Entertainment', 'Other'],
    datasets: [
      {

  
      data: [280, 80, 40, 0],
      backgroundColor: ['#10B981', '#FBBF24', '#60A5FA', '#A78BFA'],
      borderWidth: 0,
      hoverOffset: 6
      }
    ] 
  };
  spendingOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
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
          label: (context) => {
            const value = Number(context.raw ?? 0);
            const formatted = new Intl.NumberFormat('it-IT', {
              style: 'currency',
              currency: 'EUR'
            }).format(value);

            return `${context.label}: ${formatted}`;
          }
        }
      }
    }
  };
}
