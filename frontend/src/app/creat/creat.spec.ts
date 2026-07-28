import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Creat } from './creat';

describe('Creat', () => {
  let component: Creat;
  let fixture: ComponentFixture<Creat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creat],
    }).compileComponents();

    fixture = TestBed.createComponent(Creat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
