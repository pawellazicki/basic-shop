import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, delay, take } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { DataDialogComponent } from 'src/app/shared/components/data-dialog/data-dialog.component';
import { Todo } from 'src/app/shared/model/todo.model';
import { TodosDataService } from 'src/app/shared/services/todos-data.service';
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

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  
  constructor(
    private _todosDataService: TodosDataService,
    private _navigationService: NavigationService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
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
