import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProcessFileComponent } from './upload-process-file.component';

describe('UploadProcessFileComponent', () => {
  let component: UploadProcessFileComponent;
  let fixture: ComponentFixture<UploadProcessFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProcessFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProcessFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
