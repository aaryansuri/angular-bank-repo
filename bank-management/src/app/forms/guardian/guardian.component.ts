import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.component.html',
  styleUrls: ['./guardian.component.css'],
})
export class GuardianComponent implements OnInit {
  @Input() parentGroupForm!: FormGroup;
  @Input() guardianForm!: FormGroup;

  guardianTypes: string[] = ['s/o', 'd/o', 'w/o'];

  constructor() {}

  ngOnInit(): void {}
}
