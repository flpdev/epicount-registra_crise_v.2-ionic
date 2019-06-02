import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarRegistroPage } from './editar-registro';

@NgModule({
  declarations: [
    EditarRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarRegistroPage),
  ],
})
export class EditarRegistroPageModule {}
