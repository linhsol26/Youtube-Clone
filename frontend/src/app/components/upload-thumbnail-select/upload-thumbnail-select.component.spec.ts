import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadThumbnailSelectComponent } from './upload-thumbnail-select.component';

describe('UploadThumbnailSelectComponent', () => {
  let component: UploadThumbnailSelectComponent;
  let fixture: ComponentFixture<UploadThumbnailSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadThumbnailSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadThumbnailSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
