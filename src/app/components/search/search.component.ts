import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() sendSity: EventEmitter<string> = new EventEmitter();
  weatherForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.weatherForm = this.fb.group({
      city: ['Rivne', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.sendSity.emit(this.weatherForm.get('city')?.value);
  }
}
