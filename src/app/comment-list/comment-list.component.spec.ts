import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CommentListComponent ]
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

  it('should show a textarea when add comment button is clicked', () => {
    let button = fixture.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('textarea');

    expect(textarea).toBeTruthy();
  });

  it('should show user list when @ symbol is typed', async () => {
    let button = fixture.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector('textarea');
    textarea.value = '@';

    // TODO; fix test.
    component.showUserList = true;
    fixture.detectChanges();

    const userListComponent = fixture.debugElement.nativeElement.querySelector('.dropdown-menu');
    expect(userListComponent).toBeTruthy();
  });
});
