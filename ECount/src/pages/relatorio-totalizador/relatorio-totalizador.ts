import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { Chart } from 'chart.js';

/**
 * Generated class for the RelatorioTotalizadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatorio-totalizador',
  templateUrl: 'relatorio-totalizador.html',
})
export class RelatorioTotalizadorPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  dataRel:any;
  barChart: any;
  doughnutChart: any;
  badgeTotal: number;
  badgePerc: any = {
    ameaca :  "",
    fraca : "",
    moderada : "",
    forte : ""
  }

  badgePercTurno:any = {
    matutino : "",
    vespertino : "",
    noturno: ""
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private database: DatabaseProvider) {

    this.geraRelatorio();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatorioTotalizadorPage');
  }

  geraRelatorio(){

    var dataIni = this.navParams.get('dataInicio');
    var dataFim = this.navParams.get('dataFim');

    this.database.RelatorioTotalizador(dataIni, dataFim).then((data:any)=>{

      this.dataRel = data;
      this.badgeTotal = this.dataRel[0].qtdTotal;
      this.barChartMethod(this.dataRel[0].qtdTotal, this.dataRel[0].qtdAmeaca, this.dataRel[0].qtdFraca, this.dataRel[0].qtdModerada, this.dataRel[0].qtdForte)
      this.doughnutChartMethod(this.dataRel[0].qtdMat, this.dataRel[0].qtdVes, this.dataRel[0].qtdNot);

      // Alimenta percentuais para badge intensidade
      this.badgePerc.ameaca = ((this.dataRel[0].qtdAmeaca / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.badgePerc.fraca = ((this.dataRel[0].qtdFraca / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.badgePerc.moderada = ((this.dataRel[0].qtdModerada / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.badgePerc.forte = ((this.dataRel[0].qtdForte / this.dataRel[0].qtdTotal)*100).toFixed(2);

      //Alimenta percentuais para badge turno
      this.badgePercTurno.matutino = ((this.dataRel[0].qtdMat / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.badgePercTurno.vespertino = ((this.dataRel[0].qtdVes / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.badgePercTurno.noturno = ((this.dataRel[0].qtdNot / this.dataRel[0].qtdTotal)*100).toFixed(2);

    }, (error)=>{

      console.log(error);

    })
  } // fim geraRelatorio()


  barChartMethod(qtdTotal :number, qtdAmeaca :number, qtdFraca :number, qtdModerada :number, qtdForte :number) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Total', 'Ameaça', 'Fraca', 'Moderada', 'Forte'],
        datasets: [{
          label: '# Crises',
          data: [qtdTotal, qtdAmeaca, qtdFraca, qtdModerada, qtdForte],
          backgroundColor: [
            'rgba(255, 101, 153, 0.2)',
            'rgba(0, 146, 255, 0.2)',
            'rgba(196, 184, 56, 0.2)',
            'rgba(217, 125, 44, 0.2)',
            'rgba(176, 44, 44, 0.2)'

          ],
          borderColor: [
            'rgba(255, 101, 153, 1)',
            'rgba(0, 146, 255, 1)',
            'rgba(196, 184, 56, 1)',
            'rgba(217, 125, 44, 1)',
            'rgba(176, 44, 44, 1)'
          
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  } // fim barChartMethod()

  doughnutChartMethod(qtdMat: number, qtdVes: number, qtdNot: number) {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['MAT', 'VES', 'NOT'],
        datasets: [{
          label: '# Crises',
          data: [qtdMat, qtdVes, qtdNot],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB'
          ]
        }]
      }
    });
  }

}
