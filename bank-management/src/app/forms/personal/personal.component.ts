import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalFormComponent implements OnInit {
  @Input() parentGroupForm!: FormGroup;
  @Input() personalForm!: FormGroup;

  minDate!: Date;
  maxDate!: Date;

  passwordHide = true;

  maritalTypes = ['Single', 'Married', 'Divorced'];
  genders = ['male', 'female'];

  constructor() {}

  ngOnInit(): void {
    const currentMoment = moment();
    const year = currentMoment.year();
    const month = currentMoment.month();
    const day = currentMoment.date();

    this.minDate = new Date(year - 96, month, day);
    this.maxDate = new Date(year - 18, month, day);
  }
}
