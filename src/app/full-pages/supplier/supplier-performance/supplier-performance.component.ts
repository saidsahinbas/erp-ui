import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var ApexCharts: any;

@Component({
  selector: 'app-supplier-performance',
  templateUrl: './supplier-performance.component.html',
  styleUrls: ['./supplier-performance.component.css']
})

export class SupplierPerformanceComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.setupDropdown();
    this.renderChart();
  }

  setupDropdown(): void {
    const dropdownButton = document.getElementById('dropdownButton') as HTMLButtonElement;
    const dropdownMenu = document.getElementById('dropdownMenu') as HTMLElement;

    if (dropdownButton && dropdownMenu) {
      dropdownButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
      });
    }
  }

  renderChart(): void {
    const options = {
      chart: { type: 'line', height: '100%', toolbar: { show: false } },
      series: [
        { name: 'Clicks', data: [6500, 6418, 6456, 6526, 6356, 6456], color: '#1A56DB' },
        { name: 'CPC', data: [6456, 6356, 6526, 6332, 6418, 6500], color: '#7E3AF2' }
      ],
      xaxis: {
        categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb'],
        labels: { style: { fontSize: '12px', color: '#4B5563' } }
      },
      yaxis: { labels: { show: true } }
    };

    const chartContainer = document.getElementById('line-chart') as HTMLElement;
    if (chartContainer) {
      const chart = new ApexCharts(chartContainer, options);
      chart.render();
    }
  }
}
