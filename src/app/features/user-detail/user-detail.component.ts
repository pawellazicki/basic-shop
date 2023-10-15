import { UserDataService } from 'src/app/shared/services/user-data.service';
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { Observable, delay, take } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserDataService
  ],
})
export class UserDetailComponent {
  UserData$?: Observable<User> 

  constructor(
    private _route: ActivatedRoute,
    private _userDataService: UserDataService,
    private _navigationService: NavigationService
  ) {
    const userId = _route.snapshot.paramMap.get('id')
    if(userId) {
      this.UserData$ = _userDataService.getUser(parseInt(userId)).pipe(delay(1000))
    }
    _navigationService.setSelectedNavUnit()
  }

}
