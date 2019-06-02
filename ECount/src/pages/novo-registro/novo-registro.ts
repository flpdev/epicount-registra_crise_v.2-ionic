import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the NovoRegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novo-registro',
  templateUrl: 'novo-registro.html',
})
export class NovoRegistroPage {

  registro: any=[{
    intensidade: "",
    turno:"",
    data:"",
    observacao:""
  }]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toast: ToastController,
              public loading: LoadingController,
              public database: DatabaseProvider) {
  }

  RegistraNovaCrise(){

    let msg = this.toast.create({
      message: 'Registro inserido',
      duration: 3000,
      position: 'botton'
    });

    this.database.RegistraCrise(this.registro.intensidade, this.registro.turno, this.registro.data, this.registro.observacao);

    msg.present();
    
    this.limpaCampos();

    this.navCtrl.setRoot('HomePage');

  }

  limpaCampos(){

    this.registro.intensidade = '';
    this.registro.turno = '';
    this.registro.data = '';
    this.registro.observacao = '';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoRegistroPage');
  }

}
