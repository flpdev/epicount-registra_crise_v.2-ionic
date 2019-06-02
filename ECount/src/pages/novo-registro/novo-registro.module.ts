import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoRegistroPage } from './novo-registro';

@NgModule({
  declarations: [
    NovoRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoRegistroPage),
  ],
})
export class NovoRegistroPageModule {}
