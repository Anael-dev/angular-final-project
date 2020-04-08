import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsTodosComponent } from './posts-todos.component';

describe('PostsTodosComponent', () => {
  let component: PostsTodosComponent;
  let fixture: ComponentFixture<PostsTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
