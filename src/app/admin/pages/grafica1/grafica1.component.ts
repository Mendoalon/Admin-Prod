import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {

  titleGender: string ='Estadísticas Genero';
  titleDevelop: string ='Estadísticas Desarrolladores';

  pieChartData = {
    labels: ['Masculino', 'Femenino', 'No binario'],
    datasets: [{
      data: [27, 20, 3],
      backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }]
  };

  pieChartData2 = {
    labels: ['Analista QA', 'Big Data Developer', 'Desarrollador .NET'],
    datasets: [{
      data: [2, 4, 8],
       backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }]
  };
}

