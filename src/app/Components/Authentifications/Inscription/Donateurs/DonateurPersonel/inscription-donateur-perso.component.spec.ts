import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionPersoComponent } from './inscription-donateur-perso.component';


describe('ProduitFormComponent', () => {
  let component: InscriptionPersoComponent;
  let fixture: ComponentFixture<InscriptionPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionPersoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
