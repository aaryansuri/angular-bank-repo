import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import csc from 'country-state-city';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Input() parentGroupForm!: FormGroup;
  @Input() addressForm!: FormGroup;

  country = '';

  countries: string[] = [];
  states: string[] = [];

  constructor() {
    csc
      .getAllCountries()
      .forEach((country) => this.countries.push(country.name));
  }

  ngOnInit(): void {}

  changeStates() {
    this.country = this.addressForm.get('country')!.value;
    console.log(this.country);

    const countryCode: any = csc
      .getAllCountries()
      .find((con) => con.name == this.country)!.isoCode;

    this.states = [];

    csc
      .getStatesOfCountry(countryCode)
      .forEach((state) => this.states.push(state.name));
  }
}
