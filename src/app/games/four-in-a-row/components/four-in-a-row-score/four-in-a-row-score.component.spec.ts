import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourInARowScoreComponent } from './four-in-a-row-score.component';

describe('FourInARowScoreComponent', () => {
  let component: FourInARowScoreComponent;
  let fixture: ComponentFixture<FourInARowScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourInARowScoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FourInARowScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
