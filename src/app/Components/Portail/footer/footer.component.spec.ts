import { ComponentFixture, TestBed } from '@angular/core/testing';

import { footersComponent } from './footer.component';

describe('footersComponent', () => {
  let component: footersComponent;
  let fixture: ComponentFixture<footersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [footersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(footersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
