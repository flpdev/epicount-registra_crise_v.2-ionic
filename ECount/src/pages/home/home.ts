import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NovoRegistroPage } from '../novo-registro/novo-registro';
import { RelatorioPage } from '../relatorio/relatorio';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  novoRegistro(){
    this.navCtrl.push('NovoRegistroPage');
  }

  relatorio(){
    this.navCtrl.push('RelatorioPage');
  }

  listarRegistros(){
    this.navCtrl.push('ListarCrisesPage');
  }

}
