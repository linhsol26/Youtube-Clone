import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInfoFormComponent } from './video-info-form.component';

describe('VideoInfoFormComponent', () => {
  let component: VideoInfoFormComponent;
  let fixture: ComponentFixture<VideoInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
