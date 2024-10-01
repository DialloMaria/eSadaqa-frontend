import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBeneficiaireComponent } from './BeneficiaireRegister.component';

describe('ProduitFormComponent', () => {
  let component: RegisterBeneficiaireComponent;
  let fixture: ComponentFixture<RegisterBeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBeneficiaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
