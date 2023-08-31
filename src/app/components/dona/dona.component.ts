import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {
  @Input() title: string = '';
  @Input() pieChartData!: ChartData<'pie', number[], string | string[]>;
  @Input() pieChartType: ChartType = 'pie';

}
