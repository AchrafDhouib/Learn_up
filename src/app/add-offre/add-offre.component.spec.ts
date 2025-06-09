import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffreComponent } from './add-offre.component';

describe('AddOffreComponent', () => {
  let component: AddOffreComponent;
  let fixture: ComponentFixture<AddOffreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOffreComponent]
    });
    fixture = TestBed.createComponent(AddOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
