import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrganisationComponent } from './OrganisationRegister.component';

describe('ProduitFormComponent', () => {
  let component: RegisterOrganisationComponent;
  let fixture: ComponentFixture<RegisterOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrganisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
