# Desafio Cinnecta · Front-end

Loja de quadrinhos da Marvel feita em Angular. O app lista as HQs, mostra os detalhes de cada edição e permite montar um carrinho de compras, tudo no navegador.

Projeto desenvolvido como desafio técnico de front-end da Cinnecta.

## Funcionalidades

- **Catálogo de HQs** (`/`): grade com a capa, o título e o preço de cada edição.
- **Detalhes da edição** (`/detalhesProdutos/:id`): capa, sinopse, preço e botão "Adicionar ao carrinho".
- **Carrinho** (`/carrinho`): lista os itens com quantidade, valor unitário e subtotal, calcula o total e permite remover itens. Ao adicionar a mesma HQ de novo, a quantidade aumenta.
- **Estados de carregamento e de carrinho vazio**, com mensagens próprias.

## Tecnologias

| Item | Versão |
| --- | --- |
| Angular | 11.2 |
| TypeScript | 4.1 |
| RxJS | 6.6 |
| Bootstrap | 4.6 |
| ngx-bootstrap | 6.2 |
| Font Awesome | 5.15 |
| Testes | Karma + Jasmine (unitários) e Protractor (e2e) |

## Pré-requisitos

- [Node.js](https://nodejs.org/) compatível com o Angular 11 (10.13+ ou 12.11+) e npm
- Angular CLI 11 (opcional, pois o projeto já traz o CLI nas dependências e os scripts do npm o utilizam)

## Como rodar

```bash
# 1. Clonar o repositório
git clone https://github.com/guicaol/Desafio_Cinnecta_FrontEnd.git
cd Desafio_Cinnecta_FrontEnd

# 2. Instalar as dependências
npm install

# 3. Subir o servidor de desenvolvimento
npm start
```

Depois é só abrir <http://localhost:4200>. A aplicação recarrega sozinha a cada alteração nos arquivos.

## Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm start` | Servidor de desenvolvimento (`ng serve`) |
| `npm run build` | Gera o build em `dist/projeto` (use `-- --prod` para o build de produção) |
| `npm test` | Testes unitários com Karma/Jasmine |
| `npm run lint` | Análise estática com TSLint |
| `npm run e2e` | Testes ponta a ponta com Protractor |

## Estrutura do projeto

```
src/app/
├── nav/                  # Barra de navegação (Produtos / Carrinho)
├── produtos/             # Listagem de HQs
├── detalhesProdutos/     # Página de detalhes e botão de compra
├── carrinho/             # Carrinho, total e remoção de itens
├── services/
│   ├── common.service.ts         # Acesso à Marvel API (com fallback)
│   └── local-storage.service.ts  # Wrapper do localStorage
├── models/comics.ts      # Modelo da resposta da API
├── app-routing.module.ts # Rotas
└── app.module.ts
```

## Como os dados funcionam

**Marvel API.** As HQs vêm da [Marvel API](https://developer.marvel.com/) (`/v1/public/comics`). As chamadas ficam centralizadas em `CommonService`.

**Catálogo de exemplo.** Se a API não responder, o `CommonService` devolve um catálogo local com seis HQs, no mesmo formato da resposta da Marvel. Assim o app continua utilizável mesmo com a API fora do ar.

**Carrinho.** Os itens ficam no `localStorage` do navegador, com o id da HQ como chave. Não existe back-end: o carrinho é por navegador e some se os dados do site forem limpos.

## Limitações conhecidas

- A chave pública e o hash da Marvel API estão escritos direto em `common.service.ts`. Para uso além deste desafio, o ideal é movê-los para `environment.ts` (ou para um proxy no servidor) e gerar novas credenciais.
- A tela do carrinho lê **todas** as chaves do `localStorage` do domínio. Qualquer outro dado salvo em `localhost:4200` por outros projetos pode aparecer como item.
- Não há finalização de compra nem autenticação; o fluxo termina no carrinho.

## Autor

[guicaol](https://github.com/guicaol)
