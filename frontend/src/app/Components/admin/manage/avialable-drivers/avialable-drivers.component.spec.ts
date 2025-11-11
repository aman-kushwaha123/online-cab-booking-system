import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvialableDriversComponent } from './avialable-drivers.component';

describe('AvialableDriversComponent', () => {
  let component: AvialableDriversComponent;
  let fixture: ComponentFixture<AvialableDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvialableDriversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvialableDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
