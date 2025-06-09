import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListAdminComponent } from './hotel-list-admin.component';

describe('HotelListAdminComponent', () => {
  let component: HotelListAdminComponent;
  let fixture: ComponentFixture<HotelListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelListAdminComponent]
    });
    fixture = TestBed.createComponent(HotelListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
