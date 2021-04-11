import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-detalhesProdutos',
  templateUrl: './detalhesProdutos.component.html',
  styleUrls: ['./detalhesProdutos.component.scss']
})
export class DetalhesProdutosComponent implements OnInit {
  public id = ''
  public comic: any;
  public localdata: any = {}
  public aux: any = {}
  constructor(
    private route: ActivatedRoute,
    private communService: CommonService,
    private localStorage: LocalStorageService
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.listProdutos();
  }

  ngOnInit() {

  }


  listProdutos() {
    return this.communService.getListComicsID(this.id).subscribe(
      (data) => { this.comic = data; },
      (erro: any) => { console.error(erro); })
  }

  buy() {
    if (this.localStorage.get(this.id) == null) {
      this.localdata.id = this.id
      this.localdata.title = this.comic.data.results[0].title
      this.localdata.price = this.comic.data.results[0].prices[0].price
      this.localdata.units = 1
      this.localStorage.set(this.id, this.localdata)
      alert("Success");
    }
    else {
      let product = this.localStorage.get(this.id)
      product.units = product.units + 1
      this.localStorage.set(this.id, product)
      alert("Success");

    }
  }
}
