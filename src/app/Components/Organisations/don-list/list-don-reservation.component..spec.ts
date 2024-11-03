import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDonCOnfirmerComponent } from './list-don-reservation.component';

describe('ListDonCOnfirmerComponent', () => {
  let component: ListDonCOnfirmerComponent;
  let fixture: ComponentFixture<ListDonCOnfirmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDonCOnfirmerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDonCOnfirmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
