import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDonateurComponent } from './profil.component';

describe('ProfilDonateurComponent', () => {
  let component: ProfilDonateurComponent;
  let fixture: ComponentFixture<ProfilDonateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilDonateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilDonateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
