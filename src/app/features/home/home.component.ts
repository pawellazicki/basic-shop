import { HttpErrorResponse } from '@angular/common/http';
import { animationLoaded } from './../../shared/utils/animations';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, delay, Observable, BehaviorSubject, map } from 'rxjs'
import { NavigationService } from 'src/app/core/services/navigation.service';
import { User } from 'src/app/shared/model/user.model'
import { UserDataService } from 'src/app/shared/services/user-data.service'
import { Animations } from 'src/app/shared/utils/animations'
import { AnimationState, NavigationRouteEnum } from 'src/app/shared/utils/consts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserDataService
  ],
  animations: [Animations.appear]
})
export class HomeComponent implements OnDestroy {
  NavigationRouteEnum = NavigationRouteEnum
  isLoading$ = new BehaviorSubject<boolean>(true)
  users: User[] = []
  
  constructor(
    private _userDataService: UserDataService,
    protected navigationService: NavigationService,
    private _snackBar: MatSnackBar
  ) {
    this.getUsersData()
    navigationService.setSelectedNavUnit(NavigationRouteEnum.HOME)
  }

  ngOnDestroy(): void {
    this.isLoading$.complete()
  }

  private getUsersData() {
    // delay to show that content is loading
    this._userDataService.getUsers()
      .pipe(delay(1000), take(1))
      .subscribe({
        next: (data) => this.users = data,
        error: (err) => {
          this._snackBar.open(`Database connection error, status: ${(err as HttpErrorResponse).status}`, 'close') 
          this.isLoading$.next(false)
        },
        complete: () => this.isLoading$.next(false)
      })
  }

  animationLoaded(): Observable<AnimationState> { 
    return animationLoaded(this.isLoading$)
  }

  get animationState$(): Observable<AnimationState> {
    return this.isLoading$.pipe(map(loading => loading ? AnimationState.HIDE : AnimationState.SHOW))
  }
}
