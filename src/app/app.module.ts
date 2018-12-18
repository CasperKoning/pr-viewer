import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrListComponent } from './pr-list/pr-list.component';
import { PullRequestCardComponent } from './pull-request-card/pull-request-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PrListComponent,
    PullRequestCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
