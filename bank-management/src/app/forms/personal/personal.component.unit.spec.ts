import { FormBuilder, FormControl } from '@angular/forms';

import { SharedFormService } from '../shared-form.service';
import { PersonalFormComponent } from './personal.component';

describe('PersonalComponent', () => {
  let component: PersonalFormComponent;
  let sharedFormService: SharedFormService;

  beforeEach(() => {
    component = new PersonalFormComponent();
    sharedFormService = new SharedFormService(new FormBuilder());
    component.personalForm = sharedFormService.sharedPersonalForm();
  });

  it('should create a form with 4 controls', () => {
    expect(component.personalForm.contains('name')).toBeTruthy();
    expect(component.personalForm.contains('password')).toBeTruthy();
    expect(component.personalForm.contains('email')).toBeTruthy();
    expect(component.personalForm.contains('gender')).toBeTruthy();
    expect(component.personalForm.contains('dob')).toBeTruthy();
    expect(component.personalForm.contains('maritalStatus')).toBeTruthy();
    expect(component.personalForm.contains('contactNo')).toBeTruthy();
  });

  it('should make name control required', () => {
    let control = component.personalForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make password control required', () => {
    let control = component.personalForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make password control required', () => {
    let control = component.personalForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make password control required', () => {
    let control = component.personalForm.get('gender');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make password control required', () => {
    let control = component.personalForm.get('dob');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make password control required', () => {
    let control = component.personalForm.get('maritalStatus');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make password control required', () => {
    let control = component.personalForm.get('contactNo');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('marital type control should have 3 types', () => {
    const expectedTypes: string[] = ['Single', 'Married', 'Divorced'];

    expect(component.maritalTypes).toEqual(expectedTypes);
  });

  it('gender type control should have 2 types', () => {
    const expectedTypes: string[] = ['male', 'female'];

    expect(component.genders).toEqual(expectedTypes);
  });

  it('form should be invalid when empty', () => {
    expect(component.personalForm.valid).toBeFalsy();
  });

  it('form should be invalid when even one control invalid', () => {
    component.personalForm.get('name')?.setValue('Aaryan');
    component.personalForm.get('password')?.setValue('Aaryan@123');
    component.personalForm.get('email')?.setValue('aaryan@gmail.com');
    component.personalForm.get('gender')?.setValue('male');
    component.personalForm.get('dob')?.setValue('08/06/1998');
    component.personalForm.get('maritalStatus')?.setValue('single');
    component.personalForm.get('contactNo')?.setValue('9149883'); //incorrect contact format

    expect(component.personalForm.valid).toBeFalsy();
  });

  it('form should be valid when all controls valid', () => {
    component.personalForm.get('name')?.setValue('Aaryan');
    component.personalForm.get('password')?.setValue('Aaryan@123');
    component.personalForm.get('email')?.setValue('aaryan@gmail.com');
    component.personalForm.get('gender')?.setValue('male');
    component.personalForm.get('dob')?.setValue('08/06/1998');
    component.personalForm.get('maritalStatus')?.setValue('single');
    component.personalForm.get('contactNo')?.setValue('9149883351');

    expect(component.personalForm.valid).toBeTruthy();
  });
});
