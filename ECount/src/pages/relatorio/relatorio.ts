import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the RelatorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {

  public formRel : FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    public loading: LoadingController,
    public database: DatabaseProvider,
    private formBuilder: FormBuilder) {

      this.formRel = this.formBuilder.group({
        tipo: ['', [Validators.required]],
        dataInicio: ['', [Validators.required]],
        dataFim: ['', [Validators.required]]

      });

    }

  GeraRelatorio() {

     // Totalizadores
    if (this.formRel.value.tipo == 1) {

      this.navCtrl.push('RelatorioTotalizadorPage', {dataInicio:this.formRel.value.dataInicio, dataFim: this.formRel.value.dataFim});

    // Detalhado  
    } else { 

      this.navCtrl.push('RelatorioDetalhadoPage', {dataInicio:this.formRel.value.dataInicio, dataFim: this.formRel.value.dataFim});
      
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatorioPage');
  }

}
