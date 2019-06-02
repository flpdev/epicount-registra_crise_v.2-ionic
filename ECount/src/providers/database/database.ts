//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { Http } from '@angular/http';


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(public http: Http,
              public storage: SQLite) {
    // VALIDA SE O BANCO DE DADOS JA FOI CRIADO
    if(!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({name: "data.db", location:"default"}).then((db:SQLiteObject) => {

        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS crises (id INTEGER PRIMARY KEY AUTOINCREMENT, intensidade INTEGER, turno INTEGER, data DATE, observacao NVARCHAR(100)",[]);
        this.isOpen = true;

      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  RegistraCrise(intensidade: number, turno: number, data: string, observacao: string ){
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO crises (intensidade, turno, data, observacao) VALUES (?,?,?,?)";
      this.db.executeSql(sql, [intensidade, turno, data, observacao]).then((data)=>{
        resolve(data);
      }, (error)=> {
        reject(error);
      });
    });
  }

  GetAllCrises(){
    return new Promise((resolve, reject)=>{
      this.db.executeSql('SELECT * FROM crises ORDER BY 1 desc',[]).then((data)=>{
        let arrayCrises = [];
        if(data.rows.length > 0){
          for (let i = 0; i < data.rows.length; i++) {
            arrayCrises.push({
              id: data.rows.item(i).id,
              intensidade: data.rows.item(i).intensidade,
              turno: data.rows.item(i).turno,
              data: data.rows.item(i).data,
              observacao: data.rows.item(i).observacao
            });          
          }
        }
        resolve(arrayCrises);
      }, (error)=> {
        reject(error);
      })
    })
  }
}
