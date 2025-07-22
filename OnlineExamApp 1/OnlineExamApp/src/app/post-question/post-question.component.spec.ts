import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostQuestionComponent } from './post-question.component';

describe('PostQuestionComponent', () => {
  let component: PostQuestionComponent;
  let fixture: ComponentFixture<PostQuestionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
