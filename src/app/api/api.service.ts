import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/rX';

@Injectable()
export class ApiService {

  people = [];
  constructor(private http: Http) { }

  getAllPeople(page = 1, query = "") {
    return this.http
      .get(`//swapi.co/api/people/?page=${page}&search=${query}`)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error) || 'Error');
  }


  getPeoplePage(next) {
    return Observable.defer(() => {
      return this.http.get(next)
        .map(res => res.json());
    });
  }

  getAllPeopleAtOnce(next = "//swapi.co/api/people/?page=1") {
    return this.getPeoplePage(next)
      .flatMap((response:any) => {
        var result = Observable.of(response.results);
      
        if (response.next) {
          return result.concat(this.getAllPeopleAtOnce(response.next));
        } else {
          return result;
        }
      });
  }

  getSpecies(url) {
    return this.http
      .get(url)
      .map(res => res.json())
      .publishReplay(1)
      .refCount()
      .catch((error:any) => Observable.throw(error.json().error) || 'Error while getting species');
  }

  getPlanet(url) {
    return this.http
      .get(url)
      .map(res => res.json())
      .publishReplay(1)
      .refCount()
      .catch((error:any) => Observable.throw(error.json().error) || 'Error while getting planet'); 
  }

  getPerson(url) {
    return this.http
      .get(url)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error) || 'Error while getting person');
  }

}
