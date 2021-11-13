import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Weather7daysComponent } from './weather7days.component';

describe('Weather7daysComponent', () => {
  let component: Weather7daysComponent;
  let fixture: ComponentFixture<Weather7daysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Weather7daysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Weather7daysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
