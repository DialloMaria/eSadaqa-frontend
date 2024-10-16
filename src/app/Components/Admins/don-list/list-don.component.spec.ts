import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDonComponent } from './ListDonComponent';

describe('ListDonComponent', () => {
  let component: ListDonComponent;
  let fixture: ComponentFixture<ListDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
