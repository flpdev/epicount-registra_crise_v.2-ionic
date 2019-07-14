import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  contaDBOpen: any = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public toastCtrl: ToastController) {

    if (this.database.isOpen != true) {
      this.openDatabase();
    }

  }

  openDatabase() {

    this.presentLoading();
    if (this.contaDBOpen <= 3) {

      try {
        this.database.CreateDatabase();
      } catch (error) {
        this.contaDBOpen++;
        this.openDatabase();
      }

    } else {

      const toast = this.toastCtrl.create({
        message: 'Falha ao iniciar banco de dados, por favor abra o App novamente.',
        duration: 3000
      });

      toast.present();

      this.platform.exitApp();

    }
  }


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Iniciando banco de dados.",
      duration: 3000
    });
    loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  novoRegistro() {
    this.navCtrl.push('NovoRegistroPage');
  }

  relatorio() {
    this.navCtrl.push('RelatorioPage');
  }

  listarRegistros() {
    this.navCtrl.push('ListarCrisesPage');
  }

  backup() {
    this.navCtrl.push('BackupPage');
  }

}
