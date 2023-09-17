import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange, DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import moment from 'moment';

@Component({
  selector: 'app-custom-date-time',
  templateUrl: './custom-date-time.component.html',
  styleUrls: ['./custom-date-time.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    }],
  encapsulation: ViewEncapsulation.None,
})
export class CustomDateTimeComponent implements OnInit {
    selectedDateRange: any//DateRange<Date>;
  
    currentHr = new Date().getHours();
    currentMn = new Date().getMinutes();
    @Output() close = new EventEmitter();
    @Input() startDate = null;
    @Input() endDate = null;
    currDate = new Date();
    hideTime: boolean = false;
    customDateTimeForm = new FormGroup({
      startdate: new FormControl(new Date()),
      enddate: new FormControl(new Date()),
      starthr: new FormControl(this.currentHr),
      startmn: new FormControl(this.currentMn),
      endhr: new FormControl(this.currentHr),
      endmn: new FormControl(this.currentMn)
    });
    btnDisable = true;
    sendDateRange: DateRange<Date>
    constructor() { }
  
    ngOnInit() {
  
      if (this.startDate && this.endDate) {
        this.hideTime = true;
        this.selectedDateRange = {
          start: moment(this.startDate),
          end: moment(this.endDate),
        }
        const startDate = moment(this.startDate)
        const endDate = moment(this.endDate)
  
  
  
        this.customDateTimeForm.patchValue({
          startdate: startDate.toDate(),
          starthr: startDate.hours(),
          startmn: startDate.minutes(),
          enddate: endDate.toDate(),
          endhr: endDate.hours(),
          endmn: endDate.minutes()
        });
        this.selectedDateRange = new DateRange(
          moment(startDate.toDate()),
          moment(endDate.toDate())
        )
      }
      if (this.customDateTimeForm.controls['startdate'].value === null || this.customDateTimeForm.controls['enddate'].value === null)
        this.btnDisable = true
    }
  
    onCustomConfirmClick(): void {
      this.selectedDateRange.start.set({
        hour: this.customDateTimeForm.controls['starthr'].value,
        minute: this.customDateTimeForm.controls['startmn'].value
      });
      this.selectedDateRange.end.set({
        hour: this.customDateTimeForm.controls['endhr'].value,
        minute: this.customDateTimeForm.controls['endmn'].value
      });  
  
      this.close.emit(this.selectedDateRange);
    }
    onCustomCancelClick() {
      this.close.emit();
    }
  
    onCustomArrowUp(customSpecifier: string) {
      let starthr = this.customDateTimeForm.get('starthr')?.value;
      let endhr = this.customDateTimeForm.get('endhr')?.value;
      let startmn = this.customDateTimeForm.get('startmn')?.value;
      let endmn = this.customDateTimeForm.get('endmn')?.value;
      if (customSpecifier === 'starthr') {
        if (starthr === 23) {
          this.customDateTimeForm.get('starthr')?.setValue(0);
        } else {
          starthr++;
          this.customDateTimeForm.get('starthr').setValue(starthr);
        }
      }
      else if (customSpecifier === 'endhr') {
        if (endhr === 23) {
          this.customDateTimeForm.get('endhr')?.setValue(0);
        } else {
          endhr++;
          this.customDateTimeForm.get('endhr')?.setValue(endhr);
        }
      }
      else if (customSpecifier === 'endmn') {
        if (endmn === 59) {
          this.customDateTimeForm.get('endmn')?.setValue(0);
        } else {
          endmn++;
          this.customDateTimeForm.get('endmn')?.setValue(endmn);
        }
      }
      else {
        if (startmn === 59) {
          this.customDateTimeForm.get('startmn')?.setValue(0);
        } else {
          startmn++;
          this.customDateTimeForm.get('startmn')?.setValue(startmn);
        }
      }
      this.checkCustomFutureTime();
      this.checkCustomCompareTime();
    }
  
    onArrowDown(customSpecifier: string) {
      let starthr = this.customDateTimeForm.get('starthr')?.value;
      let endhr = this.customDateTimeForm.get('endhr')?.value;
      let startmn = this.customDateTimeForm.get('startmn')?.value;
      let endmn = this.customDateTimeForm.get('endmn')?.value;
      if (customSpecifier === 'starthr') {
        if (starthr === 0) {
          this.customDateTimeForm.get('starthr')?.setValue(23);
        } else {
          starthr--;
          this.customDateTimeForm.get('starthr')?.setValue(starthr);
        }
      } else if (customSpecifier === 'endhr') {
        if (endhr === 0) {
          this.customDateTimeForm.get('endhr')?.setValue(23);
        } else {
          endhr--;
          this.customDateTimeForm.get('endhr')?.setValue(endhr);
        }
      }
      else if (customSpecifier === 'endmn') {
        if (endmn === 0) {
          this.customDateTimeForm.get('endmn')?.setValue(59);
        } else {
          endmn--;
          this.customDateTimeForm.get('endmn')?.setValue(endmn);
        }
      } else {
        if (startmn === 0) {
          this.customDateTimeForm.get('startmn')?.setValue(59);
        } else {
          startmn--;
          this.customDateTimeForm.get('startmn')?.setValue(startmn);
        }
      }
      this.checkCustomFutureTime();
      this.checkCustomCompareTime();
    }
    checkCustomFutureTime() {
      let startdate = new Date(this.customDateTimeForm.get('startdate')?.value);
      startdate.setHours(this.customDateTimeForm.get('starthr')?.value);
      startdate.setMinutes(this.customDateTimeForm.get('startmn')?.value);
      let enddate = new Date(this.customDateTimeForm.get['enddate']?.value);
      enddate.setHours(this.customDateTimeForm.get['endhr']?.value);
      enddate.setMinutes(this.customDateTimeForm.get['endmn']?.value);
  
      if (startdate.getTime() >= new Date().getTime() && enddate.getTime() >= new Date().getTime()) {
        this.btnDisable = true;
      }
      else if(startdate.getTime() >= enddate.getTime() )
      this.btnDisable=true;
      else {
        this.btnDisable = false;
      }
      if (this.customDateTimeForm.get('startdate')?.value === null || this.customDateTimeForm.get('enddate')?.value === null) {
        this.btnDisable = true;
      }
    }
  
    onKeyPress() {
      if (this.customDateTimeForm.controls['starthr']?.value > 23 || this.customDateTimeForm.controls['startmn']?.value > 59 || this.customDateTimeForm.controls['endhr']?.value > 23 || this.customDateTimeForm.controls['endmn']?.value > 59) {
        this.btnDisable = true;
      }
      else if (!this.customDateTimeForm.controls['starthr'].value || !this.customDateTimeForm.controls['startmn'].value || !this.customDateTimeForm.controls['endhr'].value || !this.customDateTimeForm.controls['endmn'].value ) {
        this.btnDisable = true;
      }
      else {
        this.checkCustomFutureTime();
        this.checkCustomCompareTime();
      }
    }
  
    checkCustomCompareTime() {
      this.selectedDateRange.start.set({'hour':this.customDateTimeForm.controls['starthr'].value, 'minute':this.customDateTimeForm.controls['startmn'].value})
      this.selectedDateRange.end.set({'hour':this.customDateTimeForm.controls['endhr'].value, 'minute':this.customDateTimeForm.controls['endmn'].value})
      if (this.selectedDateRange.start >= this.selectedDateRange.end)
        this.btnDisable = true;
      else if(this.selectedDateRange.end.isSameOrAfter(new Date()))
        this.btnDisable = true;
      else
      this.btnDisable = false;
    }
  
    timeLimitHour(event){
        if(event.target.value.length == 1){
          if(Number(event.target.value) > 2){
              event.preventDefault();
          }else{
            if(event.target.value != '1'){
              if(Number(event.key) > 3){
                this.btnDisable = true;
                event.preventDefault();
              }else{
                this.checkCustomFutureTime();
                this.checkCustomCompareTime();
              }
            }
          }
        }else if(event.target.value.length > 0){
          if(event.target.value >= Number("2")){
            if(event.key > 3){
              this.btnDisable = true;
              event.preventDefault();
            }else{
              this.checkCustomFutureTime();
              this.checkCustomCompareTime();
            }
          }else{
            this.btnDisable = true;
            this.checkCustomFutureTime();
            this.checkCustomCompareTime();
          }
        }
    }
    timeLimitMin(event){
        if(event.target.value.length == 1){
          if(Number(event.target.value) > 5){
              event.preventDefault();
          }else{
            if(event.target.value != '1' || event.target.value != '2' || event.target.value != '3' || event.target.value != '4' || event.target.value != '5'){
              if(Number(event.key) > 9){
                event.preventDefault();
              }else{
                this.checkCustomFutureTime();
                this.checkCustomCompareTime();
              }
            }
          }
        }else if(event.target.value.length > 0){
          if(event.target.value == "5"){
            if(event.key > 9){
              event.preventDefault();
            }else{
              this.checkCustomFutureTime();
              this.checkCustomCompareTime();
            }
          }else{
            this.checkCustomFutureTime();
            this.checkCustomCompareTime();
          }
        }
    }
  
  
    _onSelectedChange(date:Date): void {
      if (
        this.selectedDateRange?.start &&
        date >= this.selectedDateRange.start &&
        !this.selectedDateRange.end
      ) {
        this.selectedDateRange = new DateRange(
          this.selectedDateRange.start,
          date
        );
      } else {
        this.selectedDateRange = new DateRange(date, null);
      }
      this.customDateTimeForm.get('startdate').setValue((this.selectedDateRange?.start));
      this.customDateTimeForm.get('enddate').setValue((this.selectedDateRange?.end));
      this.checkCustomFutureTime();
      if (this.selectedDateRange.start && this.selectedDateRange.end)
        {
          this.hideTime = true;
          this.checkCustomFutureTime();
          this.checkCustomCompareTime();
        }
      else
        this.hideTime = false;
    }
  
    formatDateTime(date:Date){
      return moment(date).format('DD MMMM YYYY hh:mm:ss A');
    }
}