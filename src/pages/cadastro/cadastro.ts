import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CadastroDTO } from '../../models/cadastro.model';
import { ServerService } from '../../services/banco.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  formGroup:FormGroup

  foto:any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private serverService:ServerService,
    public formBuilder:FormBuilder) {
      this.formGroup = this.formBuilder.group({
        nome: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(120)]],
        valorAtual:[0,[Validators.required]],
        incOmissao:[0,[Validators.required]],
        
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  AllowNumbersOnly(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.foto = reader.result.split(',')[1]
      };
    }
  }

  cadastraProduto(cadastro:CadastroDTO){
    cadastro.foto = this.foto;
    cadastro.limiteVenda = "2019-09-30T23:59:00.00Z"
    console.log(cadastro)
    this.serverService.realizaCadastro(cadastro).subscribe(response => {
      let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        subTitle: response,
        buttons: ['Ok']
      });
      alert.present();
    })
    this.navCtrl.setRoot('ListaProdutoPage');
  }

}
