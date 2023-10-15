import { MatRippleModule } from '@angular/material/core';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatCardModule} from '@angular/material/card'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HomeComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class FeaturesModule { }
