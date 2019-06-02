import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EditarRegistroPage } from '../editar-registro/editar-registro';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ListarCrisesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listar-crises',
  templateUrl: 'listar-crises.html',
})
export class ListarCrisesPage {

  registros:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private database: DatabaseProvider,
              public toast: ToastController) {

    this.listaRegistros();
    
  }

  listaRegistros(){
    this.registros = this.database.GetAllCrises
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarCrisesPage');
  }

  editarRegistro(idRegistro){
    console.log('aqui' + idRegistro);
    this.navCtrl.push('EditarRegistroPage');
  }

  excluirregistro(idRegistro){

    let msg = this.toast.create({
      message: 'Registro inserido',
      duration: 3000,
      position: 'botton'
    });


    console.log('excluir' + idRegistro);

    
  }

}
