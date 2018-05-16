import { API_CONFIG} from '../config/api.config';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

//Classes
import { ProdutoDTO } from "../models/produto.model";
import { CadastroDTO } from "../models/cadastro.model";
import { IncrementoDTO } from "../models/incremento.model";
import { OfertaDTO} from "../models/ofertas.model"
import { Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class ServerService {
    constructor(private http: Http) { }
// Metodos GET
buscaTodosProdutos(): Observable<ProdutoDTO[]> {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos`)
        .map(response => <ProdutoDTO[]>response.json())
}

buscaProdutoNome(nome:string): Observable<ProdutoDTO[]> {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/${nome}`)
        .map(response => <ProdutoDTO[]>response.json());
}

buscaProdutoID(id:number): Observable<ProdutoDTO> {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/id/${id}`)
        .map(response => <ProdutoDTO>response.json());
}

// Metodos POST
realizaCadastro(cadastro: CadastroDTO): Observable<string> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${API_CONFIG.baseUrl}/produtos`,
        JSON.stringify(cadastro),
        options).map(response => response.text());

}

realizaOferta(oferta: OfertaDTO): Observable<ProdutoDTO> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${API_CONFIG.baseUrl}/produtos/oferta`,
        JSON.stringify(oferta),
        options).map(response => response.json())
}

realizaOfertaIncremento(incremento: IncrementoDTO): Observable<ProdutoDTO> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${API_CONFIG.baseUrl}/produtos/incremento`,
        JSON.stringify(incremento),
        options).map(response => response.json())
}
}