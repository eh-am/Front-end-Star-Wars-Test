import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Person } from '../person.model';
import { MdDialog, MdDialogRef } from '@angular/material';
// import { PersonInfoComponent } from '../person-info/person-info.component';
import { PersonInfoDialogComponent } from '../person-info-dialog/person-info-dialog.component';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [ ApiService ]
})
export class CatalogComponent implements OnInit {

  people: Person[];
  currentPage: number = 1;
  totalPeople: number = 0;

  constructor(private apiService: ApiService, public dialog: MdDialog) {}

  ngOnInit() {
    this.loadPage(this.currentPage);
  }

  loadPage(page:number) {
    this.apiService.getAllPeople(page).subscribe(res => {
      this.totalPeople = res.count;
      this.people = res.results;
      this.currentPage = page;
    });
  }

  onPageChange($event) {
    this.loadPage($event);
  }

  onClickPerson($event) {
    let dialogRef = this.dialog.open(PersonInfoDialogComponent,{
      data: $event
    });
    
    dialogRef.afterClosed().subscribe(person => {
      // reopen with the person it was told to see
      if (person) this.onClickPerson(person);
    })
  }

}
