import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Printer, PrintOptions } from '@ionic-native/printer';

@IonicPage()
@Component({
  selector: 'page-relatorio-detalhado',
  templateUrl: 'relatorio-detalhado.html',
})
export class RelatorioDetalhadoPage {

  registrosLista:any;
  dataRel:any;
  qtdCrises: any = {
    ameaca :  "",
    fraca : "",
    moderada : "",
    forte : "",
    total : ""
  }

  percIntensidade: any = {
    ameaca :  "",
    fraca : "",
    moderada : "",
    forte : ""
  }

  percTurno:any = {
    matutino : "",
    vespertino : "",
    noturno: ""
  }

  dataIni: string = "";
  dataFim: string = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private database: DatabaseProvider,
              private printer: Printer) {

      this.dataIni = this.navParams.get('dataInicio');
      this.dataFim = this.navParams.get('dataFim');
      
      this.geraRelatorio(this.dataIni,this.dataFim);
      
  }

  imprimir(content){
    let options: PrintOptions = {
      name: 'Registros Ecount',
      printerId: 'printer007',
      duplex: true,
      landscape: true,
      grayscale: true
    };
 
    this.printer.print(content, options);
  }

  geraRelatorio(dataIni:string, dataFim:string){

    this.database.RelatorioDetalhadoLista(dataIni, dataFim).then((data)=>{
      this.registrosLista = data;
    })

    this.database.RelatorioTotalizador(dataIni, dataFim).then((data:any)=>{

      this.dataRel = data;

      this.qtdCrises.total = this.dataRel[0].qtdTotal;
      this.qtdCrises.ameaca = this.dataRel[0].qtdAmeaca;
      this.qtdCrises.fraca = this.dataRel[0].qtdFraca;
      this.qtdCrises.moderada = this.dataRel[0].qtdModerada;
      this.qtdCrises.forte = this.dataRel[0].qtdForte;

      // Alimenta percentuais para badge intensidade
      this.percIntensidade.ameaca = ((this.dataRel[0].qtdAmeaca / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.percIntensidade.fraca = ((this.dataRel[0].qtdFraca / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.percIntensidade.moderada = ((this.dataRel[0].qtdModerada / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.percIntensidade.forte = ((this.dataRel[0].qtdForte / this.dataRel[0].qtdTotal)*100).toFixed(2);

      //Alimenta percentuais para badge turno
      this.percTurno.matutino = ((this.dataRel[0].qtdMat / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.percTurno.vespertino = ((this.dataRel[0].qtdVes / this.dataRel[0].qtdTotal)*100).toFixed(2);
      this.percTurno.noturno = ((this.dataRel[0].qtdNot / this.dataRel[0].qtdTotal)*100).toFixed(2);

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatorioDetalhadoPage');
  }

}
