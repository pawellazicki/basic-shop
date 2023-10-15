import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FrameComponent } from './frame/frame.component'
import { MatIconModule } from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import { TopbarComponent } from './topbar/topbar.component'
import { FooterComponent } from './footer/footer.component'

@NgModule({
  declarations: [
    FrameComponent,
    TopbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [
    FrameComponent
  ]
})
export class CoreModule { }
