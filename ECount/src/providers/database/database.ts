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

    this.CreateDatabase();

  }

  CreateDatabase(){
        // VALIDA SE O BANCO DE DADOS JA FOI CRIADO
        if(!this.isOpen){
          this.storage = new SQLite();
          this.storage.create({name: "data.db", location:"default"}).then((db:SQLiteObject) => {
    
            this.db = db;
            db.executeSql("CREATE TABLE IF NOT EXISTS crises (id INTEGER PRIMARY KEY AUTOINCREMENT, intensidade INTEGER, turno INTEGER, data DATE, observacao TEXT)",[]);
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

  GetCriseEdit(idCrise : number){
    return new Promise((resolve, reject)=>{
      this.db.executeSql('SELECT * FROM crises WHERE id = ?',[idCrise]).then((data)=>{

        if (data.rows.length > 0) {        
          var criseEdit = data.rows.item(0);        
        }

        resolve(criseEdit);
      },(error)=>{
        reject(error);
      });
    });
  }

  DeleteCrise(idCrise : number){
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM crises WHERE id = ?";
      this.db.executeSql(sql, [idCrise]).then((data)=>{
        resolve(data);
      },(error)=>{
        reject(error);
      })
    })
  }

  UpdateCrise(id:number, intensidade: number, turno: number, data: string, observacao: string ){
    return new Promise((resolve, reject) => {
      let sql = "UPDATE crises SET intensidade = ?, turno = ?, data = ?, observacao = ? WHERE id = ?";
      this.db.executeSql(sql, [intensidade, turno, data, observacao, id]).then((data)=>{
        resolve(data);
      }, (error)=> {
        reject(error);
      });
    });
  }

  RelatorioTotalizador(dataIni: string, dataFim:string){

    return new Promise((resolve, reject) => {

      let sql = "SELECT (SELECT COUNT(1) FROM crises WHERE data BETWEEN '"+ dataIni +"' and '"+ dataFim +"' AND intensidade = 1) AS qtdAmeaca," +
                "(SELECT COUNT(1) FROM crises WHERE data BETWEEN '"+ dataIni +"' and '"+ dataFim +"' AND intensidade = 2) AS qtdFraca," +
                "(SELECT COUNT(1) FROM crises WHERE data BETWEEN '"+ dataIni +"' and '"+ dataFim +"' AND intensidade = 3) AS qtdModerada," +
                "(SELECT COUNT(1) FROM crises WHERE data BETWEEN '"+ dataIni +"' and '"+ dataFim +"' AND intensidade = 4) AS qtdForte," +
                "(SELECT COUNT(1) FROM crises WHERE data BETWEEN '"+ dataIni +"' and '"+ dataFim +"' AND turno = 1) AS qtdMat," +
                "(SELECT COUNT(1) FROM crises WHERE data BETWEEN '"+ dataIni +"' and '"+ dataFim +"' AND turno = 2) AS qtdVes," +
                "(SELECT COUNT(1) FROM crises WHERE data BETWEEN '"+ dataIni +"' and '"+ dataFim +"' AND turno = 3) AS qtdNot," +
                "(SELECT COUNT(1) FROM crises WHERE data BETWEEN '"+ dataIni +"' and '"+ dataFim +"') AS qtdTotal";
                
      this.db.executeSql(sql, []).then((data)=>{ //OS COLCHETES DE VARIÁVEIS DEVEM SEMPRE SER INSERIDOS, CASO CONTRARIO HAVERÁ ERRO

        let arrayRegistros = [];
        if (data.rows.length > 0) {

          for (let i = 0; i < data.rows.length; i++) {

            arrayRegistros.push({
              qtdAmeaca : data.rows.item(i).qtdAmeaca,
              qtdFraca : data.rows.item(i).qtdFraca,
              qtdModerada : data.rows.item(i).qtdModerada,
              qtdForte : data.rows.item(i).qtdForte,
              qtdMat : data.rows.item(i).qtdMat,
              qtdVes : data.rows.item(i).qtdVes,
              qtdNot : data.rows.item(i).qtdNot,
              qtdTotal : data.rows.item(i).qtdTotal
            });

          }
        }

        resolve(arrayRegistros);
        
      }, (error)=>{

        reject(error);

      });
    });

  }

}
