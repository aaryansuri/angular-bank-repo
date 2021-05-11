import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedFormService } from '../shared-form.service';
import { GuardianComponent } from './guardian.component';

describe('GuardianComponent', () => {
  let component: GuardianComponent;
  let sharedFormService: SharedFormService;

  beforeEach(() => {
    component = new GuardianComponent();
    sharedFormService = new SharedFormService(new FormBuilder());
    component.guardianForm = sharedFormService.sharedGuardianForm();
  });

  it('should create a form with 2 controls', () => {
    expect(component.guardianForm.contains('type')).toBeTruthy();
    expect(component.guardianForm.contains('name')).toBeTruthy();
  });

  it('should make type control required', () => {
    let control = component.guardianForm.get('type');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make name control required', () => {
    let control = component.guardianForm.get('name');
    control?.setValue('Aa');
    expect(control?.valid).toBeFalsy();
  });

  it('type control should have 3 types', () => {
    const expectedGaurdians: string[] = ['s/o', 'd/o', 'w/o'];

    expect(component.guardianTypes).toEqual(expectedGaurdians);
  });

  it('form should be invalid when empty', () => {
    expect(component.guardianForm.valid).toBeFalsy();
  });

  it('form should be invalid when either control invalid', () => {
    component.guardianForm.get('type')?.setValue('');
    component.guardianForm.get('name')?.setValue('Father');

    expect(component.guardianForm.valid).toBeFalsy();

    component.guardianForm.get('type')?.setValue('d/o');
    component.guardianForm.get('name')?.setValue('');

    expect(component.guardianForm.valid).toBeFalsy();
  });
});
