import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { FeaturesModule } from './features/features.module'
import { TodosModule } from './features/todos/todos.module'
import { todosList } from './shared/state/todoList.reducer'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ list: todosList }),
    CoreModule,
    SharedModule,
    FeaturesModule,
    TodosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
