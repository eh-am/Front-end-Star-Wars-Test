import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/rX';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getAllPeople(page = 1, query = "") {
    return this.http
      .get(`//swapi.co/api/people/?page=${page}&search=${query}`)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error) || 'Error');
  }

  getSpecies(url) {
    return this.http
      .get(url)
      .map(res => res.json())
      .publishReplay(1)
      .refCount()
      .catch((error:any) => Observable.throw(error.json().error) || 'Error');
  }

  getPlanet(url) {
    return this.http
      .get(url)
      .map(res => res.json())
      .publishReplay(1)
      .refCount()
      .catch((error:any) => Observable.throw(error.json().error) || 'Error'); 
  }

  getPerson(url) {
    return this.http
      .get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error) || 'Error');    
  }

}
