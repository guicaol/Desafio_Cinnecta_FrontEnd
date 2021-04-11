import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Comics } from '../models/comics'
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  comics: any
  constructor(
    private communservice: CommonService
  ) {
    this.listProdutos();

  }

  ngOnInit(): void {


  }

  listProdutos() {
    return this.communservice.getListComics().subscribe(
      (data) => { this.comics = data; },
      (erro: any) => { console.error(erro); })
  }
}

