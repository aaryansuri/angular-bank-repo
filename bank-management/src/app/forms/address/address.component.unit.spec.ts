import { FormGroup, FormBuilder } from '@angular/forms';
import { AddressComponent } from './address.component';
import { SharedFormService } from '../shared-form.service';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let sharedFormService: SharedFormService;

  beforeEach(() => {
    component = new AddressComponent();
    sharedFormService = new SharedFormService(new FormBuilder());
    component.addressForm = sharedFormService.sharedAddressForm();
  });

  it('should create a form with 4 controls', () => {
    expect(component.addressForm.contains('country')).toBeTruthy();
    expect(component.addressForm.contains('state')).toBeTruthy();
    expect(component.addressForm.contains('citizenship')).toBeTruthy();
    expect(component.addressForm.contains('addressLines')).toBeTruthy();
  });

  it('should make country control required', () => {
    let control = component.addressForm.get('country');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make addressLine control required', () => {
    let control = component.addressForm.get('addressLine');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make state control required', () => {
    let control = component.addressForm.get('state');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make citizenship control required', () => {
    let control = component.addressForm.get('citizenship');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should pass if countries really exist', () => {
    expect(component.countries).toContain('India');
    expect(component.countries).toContain('Brazil');
    expect(component.countries.length).toBeGreaterThanOrEqual(195);
  });

  it('should fail if countries doesnt exist', () => {
    expect(component.countries).not.toContain('America');
    expect(component.countries).not.toContain('Europe');
    expect(component.countries).not.toContain('Delhi');
  });

  it('should get appropriate state of country', () => {
    let control = component.addressForm.get('country');
    control?.setValue('India');
    component.changeStates();
    expect(component.states).toContain('Delhi');
    expect(component.states).toContain('Maharashtra');
  });

  it('form should be invalid when empty', () => {
    expect(component.addressForm.valid).toBeFalsy();
  });

  it('form should be invalid when even one control invalid', () => {
    component.addressForm.get('country')?.setValue('India');
    component.addressForm.get('state')?.setValue('Maharashtra');
    component.addressForm.get('citizenship')?.setValue('Indian');
    component.addressForm.get('addressLines')?.setValue('');
    expect(component.addressForm.valid).toBeFalsy();
  });

  it('form should be valid when all controls valid', () => {
    component.addressForm.get('country')?.setValue('India');
    component.addressForm.get('state')?.setValue('Maharashtra');
    component.addressForm.get('citizenship')?.setValue('Indian');
    component.addressForm.get('addressLines')?.setValue('Hno17 , nagar');
    expect(component.addressForm.valid).toBeTruthy();
  });
});
