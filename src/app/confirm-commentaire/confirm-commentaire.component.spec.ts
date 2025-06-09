import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCommentaireComponent } from './confirm-commentaire.component';

describe('ConfirmCommentaireComponent', () => {
  let component: ConfirmCommentaireComponent;
  let fixture: ComponentFixture<ConfirmCommentaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmCommentaireComponent]
    });
    fixture = TestBed.createComponent(ConfirmCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
