import { NgModule } from '@angular/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MdbModule } from 'mdb-angular-ui-kit';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

import { MatToolbarModule } from '@angular/material/toolbar';
import { WavesModule } from 'angular-bootstrap-md';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ButtonsModule, IconsModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CommonModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MdbModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatDividerModule,
    MatToolbarModule,
    WavesModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    LayoutModule,
    MDBBootstrapModule,
    ButtonsModule,
    IconsModule,
    NgbModule,
    MatTableModule,
    MatGridListModule,
    MatCardModule,
  ],
})
export class AppMaterialModule {}
