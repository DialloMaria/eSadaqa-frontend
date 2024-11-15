import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeneficiaireComponent } from './register.component';

describe('AddBeneficiaireComponent', () => {
  let component: AddBeneficiaireComponent;
  let fixture: ComponentFixture<AddBeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBeneficiaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
