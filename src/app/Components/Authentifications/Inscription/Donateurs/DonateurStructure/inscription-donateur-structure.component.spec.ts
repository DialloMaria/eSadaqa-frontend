import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDonateurStructureComponent } from './inscription-donateur-structure.component';

describe('ProduitFormComponent', () => {
  let component: InscriptionDonateurStructureComponent;
  let fixture: ComponentFixture<InscriptionDonateurStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionDonateurStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionDonateurStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
