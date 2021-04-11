import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comics } from '../models/comics'

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl = 'http://gateway.marvel.com'
  key = '?ts=1618055265451&apikey=ddec1853645eea38320df901aea376da&hash=09d8659f3a714ea314a62c33dc97c254'

  constructor(private http: HttpClient) {
  }
  public getListComics() {

    return this.http.get(this.baseUrl + '/v1/public/comics' + this.key);
  }

  public getListComicsID(id: any) {

    return this.http.get(this.baseUrl + '/v1/public/comics/' + id + this.key);
  }

}
