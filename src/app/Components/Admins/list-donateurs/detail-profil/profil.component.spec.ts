import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDetailDonateurComponent } from './profil.component';

describe('ProfilDetailDonateurComponent', () => {
  let component: ProfilDetailDonateurComponent;
  let fixture: ComponentFixture<ProfilDetailDonateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilDetailDonateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilDetailDonateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
