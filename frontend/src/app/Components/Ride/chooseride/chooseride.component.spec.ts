import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooserideComponent } from './chooseride.component';

describe('ChooserideComponent', () => {
  let component: ChooserideComponent;
  let fixture: ComponentFixture<ChooserideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooserideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooserideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
