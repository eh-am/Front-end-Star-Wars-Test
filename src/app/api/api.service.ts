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


  getPeoplePage(page) {
    return Observable.defer(() => {
      return this.http.get(`//swapi.co/api/people/?page=${page}`)
        .map(res => res.json());
    });
  }

  getAllPeopleAtOnce(page = 1){
    return this.getPeoplePage(page)
      .flatMap((response:any) => {
        var result = Observable.of(response.results);
      
        if(response.next){
          return result.concat(this.getAllPeopleAtOnce(page + 1));
        } else {
          return result;
        }
      });
    // const peopleObs = this.http
    //   .get(`//swapi.co/api/people/?page=${page}`)
    //   .map(res => res.json())
    //   .catch((error:any) => Observable.throw(error.json().error) || 'Error');

    // peopleObs.subscribe( res => {
    //   if (res.next) {
    //     this.people.push(...res.results);
    //     return this.getAllPeopleAtOnce(page + 1);
    //   } else {
    //     return res.results;
    //   }
    // });
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
