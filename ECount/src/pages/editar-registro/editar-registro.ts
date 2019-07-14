import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
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

  public formulario: FormGroup;

  registroEdit: any = [{
    id: "",
    intensidade: "",
    turno: "",
    data: "",
    observacao: ""
  }]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    private formBuilder: FormBuilder,
    public toast: ToastController,
    public loading: LoadingController) {


    this.carregaInfo();

  }

  carregaInfo() {

    //CARREGA FORMULARIO (É NECESSÁRIO ESTAR FORA POIS CASO CONTRÁRIO DARÁ ERRO DEVIDO A VALIDAÇÕES)
    this.formulario = this.formBuilder.group({
      id: [''],
      intensidade: ['', [Validators.required]],
      turno: ['', [Validators.required]],
      data: ['', [Validators.required]],
      observacao: ['', [Validators.required, Validators.maxLength(100)]]
    });

    var idRegistro = this.navParams.get('idRegistro')
    this.database.GetCriseEdit(idRegistro).then((data: any) => {
      this.registroEdit = data;

      //ALIMENTA CAMPOS COM DADOS RETORNADOS DO SELECT BY ID
      this.formulario.setValue({
        id: this.registroEdit.id,
        intensidade: this.registroEdit.intensidade,
        turno: this.registroEdit.turno,
        data: this.registroEdit.data,
        observacao: this.registroEdit.observacao
      });

    }, (error) => {
      console.log(error);
    })
  }

  gravaEdicaoRegistro() {

    let msg = this.toast.create({
      message: 'Registro alterado',
      duration: 3000,
      position: 'botton'
    });

    this.database.UpdateCrise(this.formulario.value.id, this.formulario.value.intensidade, this.formulario.value.turno, this.formulario.value.data, this.formulario.value.observacao).then((data) => {

      console.log(data);
      msg.present();
      this.formulario.reset();
      this.navCtrl.setRoot('HomePage');

    }, (error) => {
      console.log(error);
    })

  }
}
