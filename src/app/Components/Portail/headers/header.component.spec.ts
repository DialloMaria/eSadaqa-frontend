import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersMenuComponent } from './header.component';

describe('HeadersMenuComponent', () => {
  let component: HeadersMenuComponent;
  let fixture: ComponentFixture<HeadersMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadersMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
