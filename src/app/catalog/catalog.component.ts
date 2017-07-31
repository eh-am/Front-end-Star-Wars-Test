import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/rX';
import { Person } from '../person.model';
import { MdDialog, MdDialogRef, MdSort } from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { PersonInfoDialogComponent } from '../person-info-dialog/person-info-dialog.component';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [ ApiService ]
})

export class CatalogComponent implements OnInit {

  @Input() search: String = "";

  people: Person[];
  loading: Boolean = true;

  currentPage: number = 1;
  totalPeople: number = 0;

  personDatabase = new PersonDatabase(this.apiService);
  dataSource: PeopleDataSource | null;
  displayedColumns = ['name', 'gender', 'birth_year'];
  
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private apiService: ApiService, public dialog: MdDialog) {}

  ngOnInit() {
    this.dataSource = new PeopleDataSource(this.personDatabase, this.sort);
    
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  loadPeople(){
    let ppl = [];
    this.apiService.getAllPeopleAtOnce().subscribe(res => {
      ppl = ppl.concat(Array.from(res));
    }, () => {
      console.log('error')
    }, (res) => {
      this.people = ppl;

        
      // TODO
      this.loading = false;
    });
  }

  onClickPerson($event) {
    let dialogRef = this.dialog.open(PersonInfoDialogComponent,{
      data: $event
    });
    
    dialogRef.afterClosed().subscribe(person => {
      // reopen with the person it was told to
      if (person) this.onClickPerson(person);
    })
  }

  searchFor(person) {
    // this.loadPage(1, person);
  }
}


export class PeopleDataSource extends DataSource<any> {
  dataChange: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _personDatabase: PersonDatabase, private _sort: MdSort) {
    super();
  }
  
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Person[]> {
    const displayDataChanges = [
      this._personDatabase.dataChange,
      this._sort.mdSortChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData(this._personDatabase.data.slice().filter((item: Person) => {
        let searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      }));
    });
  }

  getSortedData(data): Person[] {
    data = data || this._personDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: String = '';
      let propertyB: String = '';

      switch (this._sort.active) {
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'gender': [propertyA, propertyB] = [a.gender, b.gender]; break;
        case 'birth_year': [propertyA, propertyB] = [a.birth_year, b.birth_year]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }

  disconnect() {}
}


export class PersonDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  get data(): Person[] { return this.dataChange.value; }

  constructor(private apiService: ApiService) {
    this.loadPeople();
  }

  loadPeople(){
    let ppl = [];
    this.apiService.getAllPeopleAtOnce().subscribe(res => {
      ppl = ppl.concat(Array.from(res));
    }, () => {
      console.log('error')
    }, (res) => {
      this.dataChange.next(ppl);
    });
  }  

}