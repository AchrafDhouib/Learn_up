import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListAdminComponent } from './room-list-admin.component';

describe('RoomListAdminComponent', () => {
  let component: RoomListAdminComponent;
  let fixture: ComponentFixture<RoomListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomListAdminComponent]
    });
    fixture = TestBed.createComponent(RoomListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
