import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditarRegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-registro',
  templateUrl: 'editar-registro.html',
})
export class EditarRegistroPage {

  registro: any=[{
    intensidade: "1",
    turno:"2",
    data:"2019-12-05",
    observacao:"teste"
  }]  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.registro =[{
      intensidade: "1",
      turno:"2",
      data:"2019-12-05",
      observacao:"teste"
    }]  
  }

}
