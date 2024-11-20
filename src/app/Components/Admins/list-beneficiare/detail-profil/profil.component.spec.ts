import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDetailBeneficiaireComponent } from './profil.component';

describe('ProfilDetailBeneficiaireComponent', () => {
  let component: ProfilDetailBeneficiaireComponent;
  let fixture: ComponentFixture<ProfilDetailBeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilDetailBeneficiaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilDetailBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
