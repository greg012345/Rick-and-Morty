import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teszt } from './teszt';

describe('Teszt', () => {
  let component: Teszt;
  let fixture: ComponentFixture<Teszt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Teszt],
    }).compileComponents();

    fixture = TestBed.createComponent(Teszt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
