import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDonateurComponent } from './inscription-beneficiaire.component';

describe('InscriptionDonateurComponent', () => {
  let component: InscriptionDonateurComponent;
  let fixture: ComponentFixture<InscriptionDonateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionDonateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionDonateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
