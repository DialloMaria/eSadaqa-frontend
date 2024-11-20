import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDetailOrganisationComponent } from './profil.component';

describe('ProfilDetailOrganisationComponent', () => {
  let component: ProfilDetailOrganisationComponent;
  let fixture: ComponentFixture<ProfilDetailOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilDetailOrganisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilDetailOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
