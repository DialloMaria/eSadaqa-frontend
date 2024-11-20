import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAllDonateurComponent } from './list-donateur.component';

describe('ListeAllDonateurComponent', () => {
  let component: ListeAllDonateurComponent;
  let fixture: ComponentFixture<ListeAllDonateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAllDonateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAllDonateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
