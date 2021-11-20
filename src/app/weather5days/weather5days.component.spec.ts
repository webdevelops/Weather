import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Weather5daysComponent } from './weather5days.component';

describe('Weather5daysComponent', () => {
  let component: Weather5daysComponent;
  let fixture: ComponentFixture<Weather5daysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Weather5daysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Weather5daysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
