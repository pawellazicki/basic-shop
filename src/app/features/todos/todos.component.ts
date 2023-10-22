import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core'
import { MatChipListboxChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { BehaviorSubject, delay, map, of, take } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { DataDialogComponent } from 'src/app/shared/components/data-dialog/data-dialog.component';
import { Todo } from 'src/app/shared/model/todo.model';
import { TodosDataService } from 'src/app/shared/services/todos-data.service';
import { add, remove } from 'src/app/shared/state/todoList.actions';
import { NavigationRouteEnum } from 'src/app/shared/utils/consts';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TodosDataService
  ],
})
export class TodosComponent implements OnDestroy {
  displayedColumns: string[] = ['userId', 'completed', 'title'];
  dataSource: MatTableDataSource<Todo> = new MatTableDataSource();
  isLoading$ = new BehaviorSubject<boolean>(true)
  todosSelected$ = this._store.select('list').pipe(map(list => list.todoList))

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    private _todosDataService: TodosDataService,
    private _navigationService: NavigationService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _store: Store<any>
  ) {
    // delay to show that content is loading
    _todosDataService.getTodos()
      .pipe(delay(1000), take(1)).subscribe({
        next: (data) => this.dataSource.data = data,
        error: (err) => {
          this._snackBar.open(`Database connection error, status: ${(err as HttpErrorResponse).status}`, 'close') 
          this.isLoading$.next(false)
        },
        complete: () => this.isLoading$.next(false)
      })
      _navigationService.setSelectedNavUnit(NavigationRouteEnum.TODOS)
  }

  ngOnDestroy(): void {
    this.isLoading$.complete()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }

  addToList(todo: Todo) {
    this._store.dispatch(add(todo));
  }

  removeFromList(todo: Todo) {
    setTimeout(() => {
      this._store.dispatch(remove(todo))
      this._snackBar.open('Task done!', '', {duration: 2000})
    }, 1000)
  }

  editTodo(todo: Todo) {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      data: {...todo},
    });

    dialogRef.afterClosed().subscribe((resultTodo) => {
      let itemTodo = this.dataSource.data.find((itemTodo) => itemTodo.id === (resultTodo as Todo)?.id)
      if(itemTodo) {
        Object.assign(itemTodo, resultTodo)
      }
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
