import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDonateurComponent } from './list-organisation.component';

describe('ListeDonateurComponent', () => {
  let component: ListeDonateurComponent;
  let fixture: ComponentFixture<ListeDonateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeDonateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDonateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
