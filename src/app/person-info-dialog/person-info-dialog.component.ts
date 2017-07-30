import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { PersonInfoComponent } from '../person-info/person-info.component';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/rX';

@Component({
  selector: 'app-person-info-dialog',
  templateUrl: './person-info-dialog.component.html',
  styleUrls: ['./person-info-dialog.component.css'],
  providers: [ ApiService ],
  encapsulation: ViewEncapsulation.None
})
export class PersonInfoDialogComponent implements OnInit {

  peopleFromSamePlanet;
  loading;

  constructor(public dialogRef: MdDialogRef<PersonInfoDialogComponent>,
     @Inject(MD_DIALOG_DATA) public person: any,
    private apiService: ApiService) { }

  ngOnInit() {
    this.person.speciesContent = {};
    this.peopleFromSamePlanet = [];
    this.loading = true;

    this.apiService
      .getSpecies(this.person.species)
      .subscribe(res => {
        this.person.speciesContent = res;
    });

    this.apiService
      .getPlanet(this.person.homeworld)
      .subscribe(res => {
        Observable.forkJoin(
          res.residents.map(resident => this.apiService.getPerson(resident))
        ).subscribe(res => {
          // don't show the same person you are currently vieweing
          this.peopleFromSamePlanet = res.filter((person: any) => person.url !== this.person.url)

          this.loading = false;
        });
      })
  }

  onClickPerson(person) {
    this.dialogRef.close(person);
  }

}
