import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishedPage } from './wished.page';

describe('WishedPage', () => {
  let component: WishedPage;
  let fixture: ComponentFixture<WishedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
