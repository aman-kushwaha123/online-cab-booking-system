import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverloginComponent } from './driverlogin.component';

describe('DriverloginComponent', () => {
  let component: DriverloginComponent;
  let fixture: ComponentFixture<DriverloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverloginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
