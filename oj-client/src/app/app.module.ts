import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { HttpModule } from "@angular/http"
import { Routing } from './app.routes'

// whenever create service need to provide here
import { DataService } from './services/data.service'
import { AuthService } from './services/auth.service'
import { CollaborationService } from './services/collaboration.service'

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component'

@NgModule({
  // all components 
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    EditorComponent
  ],
  // all module
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpModule
  ],
  // provide service
  providers: [
    {
      provide: 'data',
      useClass: DataService,
    },
    // globally privde the service 
    // {
    //   provide: 'auth',
    //   useClass: AuthService,
    // }
    AuthService, // not globally privde
    // if use AuthService directly, it is not gloablly provide
    // then when inject service, we need to import AuthService when we need it 
    // example is in navbar.component.ts
    CollaborationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
