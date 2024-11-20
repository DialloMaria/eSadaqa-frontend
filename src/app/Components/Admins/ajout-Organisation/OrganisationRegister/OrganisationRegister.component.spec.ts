import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAddOrganisationComponent } from './OrganisationRegister.component';

describe('ProduitFormComponent', () => {
  let component: RegisterAddOrganisationComponent;
  let fixture: ComponentFixture<RegisterAddOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAddOrganisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAddOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
