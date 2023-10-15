import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ReplaySubject, Subject } from 'rxjs'
import { NavigationLabelEnum, NavigationRouteEnum } from 'src/app/shared/utils/consts'

export interface NavigationUnit {
  selected: boolean,
  route: NavigationRouteEnum,
  icon?: string
  label?: string,
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _unsubscribe$ = new Subject<void>()
  private _navigationUnits$ = new ReplaySubject<NavigationUnit[]>()

  navigationUnits$ = this._navigationUnits$.asObservable()

  private _navigationUnits: NavigationUnit[] = []

  constructor(
    private router: Router
  ) {
    this.setNavUnits()
  }

  ngOnDestroy(): void {
    this._unsubscribe$.complete()
  }

  refreshNavUnits() {
    this._navigationUnits$.next([...this._navigationUnits])
  }

  setNavUnits() {
    this._navigationUnits = [
      {
        selected: false,
        label: NavigationLabelEnum.HOME,
        route: NavigationRouteEnum.HOME
      },
      {
        selected: false,
        label: NavigationLabelEnum.TODOS,
        route: NavigationRouteEnum.TODOS
      },
    ]
    this.refreshNavUnits()
  }

  navigate(routeType: NavigationRouteEnum, id?: number) {
    id != null ?
      this.router.navigate([routeType, id]) :
      this.router.navigateByUrl(routeType)
  }

  setSelectedNavUnit(routeType?: NavigationRouteEnum) {
    this._navigationUnits.forEach(unit => unit.selected = false)
    const unit = this._navigationUnits.find((unit) => unit.route === routeType)
    if(unit) {
      unit.selected = true
    }
    this.refreshNavUnits()
  }
}
