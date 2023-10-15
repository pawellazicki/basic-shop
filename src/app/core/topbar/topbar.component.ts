import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BasicValues } from 'src/app/shared/utils/consts'
import { NavigationService } from '../services/navigation.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  BASIC_VALUES = BasicValues

  constructor(
    protected navigationService: NavigationService
  ) {}
}
