import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsBeneficiaireComponent } from './notifications.component';

describe('NotificationsBeneficiaireComponent', () => {
  let component: NotificationsBeneficiaireComponent;
  let fixture: ComponentFixture<NotificationsBeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsBeneficiaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
