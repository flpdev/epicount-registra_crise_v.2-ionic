import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  registroEdit:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private database: DatabaseProvider,
              public toast: ToastController) {

    this.listaRegistros();
    
  }

  listaRegistros(){

    this.database.GetAllCrises().then((data: any)=>{
      console.log(data);
      this.registros = data;
    }, (error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarCrisesPage');
  }

  editarRegistro(id){

    this.navCtrl.push('EditarRegistroPage', {idRegistro:id});
    
  }

  excluirRegistro(idRegistro){

    this.database.DeleteCrise(idRegistro);

    let msg = this.toast.create({
      message: 'Registro Excluído',
      duration: 3000,
      position: 'botton'
    });

    msg.present();

    this.listaRegistros();
   
  }

}
