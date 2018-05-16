import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerService } from '../../services/banco.service';
import { ProdutoDTO } from '../../models/produto.model';

@IonicPage()
@Component({
  selector: 'page-lista-produto',
  templateUrl: 'lista-produto.html',
})
export class ListaProdutoPage {

  produtos:ProdutoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private serverService:ServerService) {
  }

  ionViewDidLoad() {
    this.serverService.buscaTodosProdutos().subscribe( response => {this.produtos = response});
  }

  navegar(produto:ProdutoDTO){
    this.navCtrl.push("ProdutoPage",{produto:produto});
  }

}

