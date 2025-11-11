import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingdriverComponent } from './pendingdriver.component';

describe('PendingdriverComponent', () => {
  let component: PendingdriverComponent;
  let fixture: ComponentFixture<PendingdriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingdriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
