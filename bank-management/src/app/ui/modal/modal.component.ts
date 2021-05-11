import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @ViewChild('basicModal') basicModal!: ModalDirective;

  progressValue = 0;

  constructor() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.basicModal.show();
    this.startProgressBar();
  }

  startProgressBar() {
    var interval = setInterval(() => {
      this.progressValue += Math.ceil(Math.random() * 35);
      if (this.progressValue >= 100) {
        clearInterval(interval);
      }
      console.log(this.progressValue);
    }, 1000);
  }

  ngOnInit(): void {}
}
