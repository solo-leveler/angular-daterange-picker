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
    this.start_date = date.start
    this.end_date = date.end
    let start_Date = moment(date.start).format('MM/DD/YYYY hh:mm:ss A');;
    let end_Date = moment(date.end).format('MM/DD/YYYY hh:mm:ss A');
    let setdate = start_Date.concat('  ——  ', end_Date);
    this. basicForm.get('time_display')?.setValue(setdate);
  }
  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.enableCal = false;
  }
}
