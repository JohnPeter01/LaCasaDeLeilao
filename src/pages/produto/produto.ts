import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.model';
import { OfertaDTO } from '../../models/ofertas.model';
import { IncrementoDTO } from '../../models/incremento.model';
import { ServerService } from '../../services/banco.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
 produto:ProdutoDTO;
 incremento:IncrementoDTO;
 oferta:OfertaDTO;
 formGroup:FormGroup;
 valor:number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private serverService:ServerService,
    public formBuilder:FormBuilder) {
    this.produto = navParams.get('produto');
    this.formGroup = this.formBuilder.group({
      oferta:[0,[Validators.required]]
    })
    }
  ionViewDidLoad() {
  }
  
  AllowNumbersOnly(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }
  }

  RealizaOferta(oferta:number,id:number){
    this.oferta = {"id":id,"oferta":oferta};
    this.serverService.realizaOferta(this.oferta).subscribe(() =>{
      let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        subTitle: 'Oferta realizada com sucesso',
        buttons: [{
          text:'Ok',
          handler: () =>{this.navCtrl.setRoot('ListaProdutoPage');}
        }]
      });
      alert.present();
   });
  }
  
  RealizaOfertaIncremento(id:number){
    this.incremento = {"id":id};
    this.serverService.realizaOfertaIncremento(this.incremento).subscribe(() =>{
      let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        subTitle: 'Oferta realizada com sucesso',
        buttons: [{
          text:'Ok',
          handler: () =>{this.navCtrl.setRoot('ListaProdutoPage');}
        }]
      });
      alert.present();
   });
  }
}
