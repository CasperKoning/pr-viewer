import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrListComponent } from './pr-list/pr-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MomentModule } from 'angular2-moment';
import { HttpClientModule } from '@angular/common/http';
import { PullRequestService } from './service/pull-request.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { TeamService } from './service/team.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { HeaderComponent } from './header/header.component';
import { PrContextService } from './service/pr-context.service';
import { GraphQLModule } from './graphql.module';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    PrListComponent,
    ThemeSwitcherComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Disable with NoopAnimationsModule
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MomentModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    GraphQLModule
  ],
  providers: [
    PrContextService,
    PullRequestService,
    TeamService,
    UserService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
