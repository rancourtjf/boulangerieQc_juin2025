
import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMatTimepickerComponent, NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: 'app-timepicker',
  standalone: true,
  imports: [MatTableModule,
    MatFormFieldModule,NgxMatTimepickerComponent,NgxMatTimepickerModule
    ],
  templateUrl: './timepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true
    }
  ],
  styleUrl: './timepicker.component.css'
})
export class TimepickerComponent implements ControlValueAccessor {
  @ViewChild('timepicker') timepicker: NgxMatTimepickerComponent;

  value: string = '';
  disabled = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(val: string): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  openPicker(): void {
    this.timepicker.open();
  }

  updateValue(newVal: string) {
    this.value = newVal;
    this.onChange(newVal);
  }
}
