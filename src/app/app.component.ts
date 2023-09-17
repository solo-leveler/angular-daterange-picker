import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-mainroot',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  enableCal: boolean = false;
  start_date: Date = new Date();
  end_date: Date = new Date();
  basicForm = new FormGroup({
    time_display: new FormControl(),
  });
  constructor() {}
  ngOnInit() {}
  onClickCalendar($event: any) {
    $event.stopPropagation();
    this.enableCal = true;
  }
  onClose(date: any) {
    this.enableCal = false;
    let start_date = moment(date.start).format('MM/DD/YYYY HH:mm:ss');;
    let end_date = moment(date.end).format('MM/DD/YYYY HH:mm:ss');
    let setdate = start_date.concat('  ——  ', end_date);
    this. basicForm.get('time_display')?.setValue(setdate);
  }
  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.enableCal = false;
  }
}
