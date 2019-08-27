import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRecentlyUploadedComponent } from './home-recently-uploaded.component';

describe('HomeRecentlyUploadedComponent', () => {
  let component: HomeRecentlyUploadedComponent;
  let fixture: ComponentFixture<HomeRecentlyUploadedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRecentlyUploadedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRecentlyUploadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
