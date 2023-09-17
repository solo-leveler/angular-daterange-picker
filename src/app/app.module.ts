import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomDateTimeComponent } from './custom-date-time/custom-date-time.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatMomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, CustomDateTimeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
