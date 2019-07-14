import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, ToastController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  contaDBOpen: any = 1;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {

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

      const confirm = this.alertCtrl.create({
        title: 'Banco de dados falhou',
        message: 'Falha ao iniciar banco de dados, por favor abra o App novamente.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              confirm.present();
              console.log('Agree clicked');
              this.platform.exitApp();
            }
          }
        ]
      });
    }
  }


  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Iniciando banco de dados, tentativa " + this.contaDBOpen,
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
