import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReservationComponent } from './client-reservation.component';

describe('ClientReservationComponent', () => {
  let component: ClientReservationComponent;
  let fixture: ComponentFixture<ClientReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientReservationComponent]
    });
    fixture = TestBed.createComponent(ClientReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
