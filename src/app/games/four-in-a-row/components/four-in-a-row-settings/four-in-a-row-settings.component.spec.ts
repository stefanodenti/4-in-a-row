import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourInARowSettingsComponent } from './four-in-a-row-settings.component';

describe('FourInARowSettingsComponent', () => {
  let component: FourInARowSettingsComponent;
  let fixture: ComponentFixture<FourInARowSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourInARowSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FourInARowSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
