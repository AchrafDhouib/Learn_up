import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambresListAdminComponent } from './chambres-list-admin.component';

describe('ChambresListAdminComponent', () => {
  let component: ChambresListAdminComponent;
  let fixture: ComponentFixture<ChambresListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChambresListAdminComponent]
    });
    fixture = TestBed.createComponent(ChambresListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
