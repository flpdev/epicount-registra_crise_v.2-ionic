import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarCrisesPage } from './listar-crises';

@NgModule({
  declarations: [
    ListarCrisesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarCrisesPage),
  ],
})
export class ListarCrisesPageModule {}
