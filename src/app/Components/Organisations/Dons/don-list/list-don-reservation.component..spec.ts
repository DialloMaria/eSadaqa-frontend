import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDonReservationComponent } from './list-don-reservation.component';

describe('ListDonReservationComponent', () => {
  let component: ListDonReservationComponent;
  let fixture: ComponentFixture<ListDonReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDonReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDonReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
