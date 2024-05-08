import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show user list when @ symbol is typed', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = '@';
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    const userListComponent = fixture.nativeElement.querySelector('.dropdown-menu');
    expect(userListComponent).toBeTruthy();
  });

  it('should add comment', () => {
    component.commentText = 'Test Comment';
    component.addComment();
    expect(component.comments.length).toBe(1);
  });
});
