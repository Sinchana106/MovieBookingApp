import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreTableComponent } from './theatre-table.component';

describe('TheatreTableComponent', () => {
  let component: TheatreTableComponent;
  let fixture: ComponentFixture<TheatreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheatreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
