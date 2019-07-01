import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackupArquivoPage } from './backup-arquivo';

@NgModule({
  declarations: [
    BackupArquivoPage,
  ],
  imports: [
    IonicPageModule.forChild(BackupArquivoPage),
  ],
})
export class BackupArquivoPageModule {}
