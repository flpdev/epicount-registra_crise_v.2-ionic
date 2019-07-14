import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';

import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { normalizeURL } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { FileOpener } from '@ionic-native/file-opener';
import { HttpClient } from '@angular/common/http';

@Injectable()

@IonicPage()
@Component({
  selector: 'page-backup',
  templateUrl: 'backup.html',
})
export class BackupPage {

  data: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseProvider,
    private file: File,
    public toast: ToastController,
    public fileChooser: FileChooser,
    public filepath: FilePath,
    public fileopener: FileOpener,
    public http: HTTP,
    public httpclient: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BackupPage');
  }

  importar() {

    this.fileChooser.open().then(uri => {
      this.filepath.resolveNativePath(uri).then(file => {

        this.data = normalizeURL(file);

        this.file.resolveLocalFilesystemUrl(file).then(fileEntry => {
          let url = fileEntry.nativeURL;

          let final = this.httpclient.get(url);

          return new Promise((resolve, reject) => {

            let fileDir = this.file.externalRootDirectory;

            let fileNameReal = file.slice(fileDir.length, file.length);

            this.file.readAsText(fileDir, fileNameReal).then(data => {

              let returnJson = JSON.parse(data);
              let sql = returnJson['__zone_symbol__value'];

              console.log('returnJson', returnJson['__zone_symbol__value']);

              this.database.Importar(sql);

              let msg = this.toast.create({
                message: 'O arquivo foi importado com sucesso.',
                duration: 3000,
                position: 'botton'
              });

              msg.present();

              resolve(returnJson);
            }, (error) => {
              reject(error);
            });

            console.log('final', final);
          });

        }).catch(error => console.log(error));
      }).catch(error => { console.log(error) })
    })
  }

  exportar() {

    let data: any;
    data = this.database.Exportar();

    var currentTime = new Date().toISOString().slice(0, 10);

    console.log(currentTime);

    console.log(this.file.externalRootDirectory);
    let path = this.file.externalRootDirectory + '/Download/';
    this.file.writeFile(path, 'EpicontBackup[' + currentTime + '].sql', data, { replace: true }).then(() => {

      let msg = this.toast.create({
        message: 'O arquivo foi baixado. Verifique sua pasta download.',
        duration: 3000,
        position: 'botton'
      });

      msg.present();

    }, (err) => {
      alert("Desculpe. Ocorreu um erro ao baixar o arquivo: " + err);
    }
    );


  }
}
