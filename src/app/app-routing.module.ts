import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { DetalhesProdutosComponent } from './detalhesProdutos/detalhesProdutos.component';
import { ProdutosComponent } from './produtos/produtos.component';


const routes: Routes = [
  { path: '', component: ProdutosComponent },
  { path: 'detalhesProdutos/:id', component: DetalhesProdutosComponent },
  { path: 'carrinho', component: CarrinhoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
