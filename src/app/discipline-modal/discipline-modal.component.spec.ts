import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineModalComponent } from './discipline-modal.component';

describe('DisciplineModalComponent', () => {
  let component: DisciplineModalComponent;
  let fixture: ComponentFixture<DisciplineModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplineModalComponent]
    });
    fixture = TestBed.createComponent(DisciplineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
