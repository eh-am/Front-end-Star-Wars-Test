import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person.model';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {

  @Input() person: Person;

  propertiesToDisplay: string[] = ['height', 'mass', 'hair_color', 'eye_color', 'birth_year', 'gender'];
  constructor() { }

  ngOnInit() {
    // debugger;
  }

}
