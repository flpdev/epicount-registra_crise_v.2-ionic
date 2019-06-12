import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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

  public formulario : FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toast: ToastController,
              public loading: LoadingController,
              public database: DatabaseProvider,
              private formBuilder: FormBuilder) {

    this.formulario = this.formBuilder.group({
      intensidade: ['', [Validators.required]],
      turno: ['', [Validators.required]],
      data: ['', [Validators.required]],
      observacao: ['', [Validators.required,Validators.maxLength(100)]]
    });
  }

  RegistraNovaCrise(){

    let msg = this.toast.create({
      message: 'Registro inserido',
      duration: 3000,
      position: 'botton'
    });

    this.database.RegistraCrise(this.formulario.value.intensidade, this.formulario.value.turno, this.formulario.value.data, this.formulario.value.observacao).then((data) => {
      
      console.log(data);
      msg.present();
      this.formulario.reset();
      this.navCtrl.setRoot('HomePage');

    },(error)=>{
      console.log(error);
    })
  }
}
