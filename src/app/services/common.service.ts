import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = 'https://gateway.marvel.com'
  key = '?ts=1618055265451&apikey=ddec1853645eea38320df901aea376da&hash=09d8659f3a714ea314a62c33dc97c254'

  // Catálogo de exemplo usado quando a Marvel API está indisponível (hoje responde 500).
  // Capas reais servidas pelo CDN público da Marvel (não exigem chave).
  private img = 'https://i.annihil.us/u/prod/marvel/i/mg';
  private mockComics = [
    { id: 1, title: 'The Incredible Hulk', description: 'O gigante esmeralda enfrenta seus próprios demônios enquanto o exército o persegue pelo deserto.', price: 3.99, path: `${this.img}/c/e0/535fecbbb9784` },
    { id: 2, title: 'Iron Man: Extremis', description: 'Tony Stark reescreve as regras da armadura — e do próprio corpo — contra uma nova ameaça.', price: 4.99, path: `${this.img}/9/c0/527bb7b37ff55` },
    { id: 3, title: 'Avengers Assemble', description: 'Os heróis mais poderosos da Terra se reúnem quando nenhum deles é páreo sozinho.', price: 5.99, path: `${this.img}/3/20/5232158de5b16` },
    { id: 4, title: 'Spider-Man: Blue', description: 'Peter Parker revisita a memória de um amor perdido em uma das histórias mais emocionantes do Aranha.', price: 2.99, path: `${this.img}/3/50/526548a343e4b` },
    { id: 5, title: 'Captain America Reborn', description: 'O destino de Steve Rogers decide o futuro dos heróis em meio à guerra.', price: 4.50, path: `${this.img}/d/03/58dd080719806` },
    { id: 6, title: 'Marvel Team-Up (Variante)', description: 'Edição especial reunindo personagens que raramente dividem a mesma página.', price: 0, path: `${this.img}/b/40/image_not_available` },
  ];

  constructor(private http: HttpClient) {
  }

  public getListComics() {
    return this.http.get(this.baseUrl + '/v1/public/comics' + this.key).pipe(
      catchError(() => of(this.buildList(this.mockComics)))
    );
  }

  public getListComicsID(id: any) {
    return this.http.get(this.baseUrl + '/v1/public/comics/' + id + this.key).pipe(
      catchError(() => {
        const found = this.mockComics.find(c => String(c.id) === String(id)) || this.mockComics[0];
        return of(this.buildList([found]));
      })
    );
  }

  // Monta a mesma estrutura retornada pela Marvel API a partir do catálogo de exemplo.
  private buildList(items: any[]) {
    return {
      data: {
        results: items.map(c => ({
          id: c.id,
          title: c.title,
          description: c.description,
          prices: [{ type: 'printPrice', price: c.price }],
          thumbnail: { path: c.path, extension: 'jpg' },
        }))
      }
    };
  }

}
