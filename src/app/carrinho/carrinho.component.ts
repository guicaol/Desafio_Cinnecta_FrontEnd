import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {
  listAll: any = []
  constructor(
    private localStorage: LocalStorageService
  ) { this.list() }

  ngOnInit() {
  }
  list() {
    Object.keys(localStorage).forEach(data => {
      let item = this.localStorage.get(data);
      console.log(item);
      this.listAll.push(item)
      console.log(this.listAll);
    });
  }

  deletar(id) {
    console.log(this.localStorage.remove(id))
    this.listAll = []
    this.list()
  }

}
