import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { DatabaseProvider } from '../providers/database/database';

import { SQLite } from '@ionic-native/sqlite';
import { HttpModule } from '@angular/http';
import { Printer } from '@ionic-native/printer';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    Printer,
    SQLitePorter,
    File,
    FileChooser,
    FilePath,
    HttpClient,
    HTTP,
    FileOpener
  ]
})
export class AppModule {}
